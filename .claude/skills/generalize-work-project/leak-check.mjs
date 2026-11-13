#!/usr/bin/env node
// Leak check for generalized work write-ups.
//
// Usage: node leak-check.mjs <source-extract> <draft> [allowlist]
//
// Collects distinctive terms from the private source extract (proper names, acronyms, identifiers) and reports
// any that reappear in the draft, plus patterns that should never be published (numbers, URLs, e-mails,
// phone numbers, classification words) and long verbatim runs copied from the source.
// Exit code: 0 = no flags, 1 = flags to resolve, 2 = bad usage.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , sourcePath, draftPath, allowArg] = process.argv;
if (!sourcePath || !draftPath) {
  console.error('Usage: node leak-check.mjs <source-extract> <draft> [allowlist]');
  process.exit(2);
}

const here = dirname(fileURLToPath(import.meta.url));
const allow = new Set(
  readFileSync(allowArg ?? join(here, 'allowlist.txt'), 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l && !l.startsWith('#')),
);
// Single words that appear inside any allowlisted entry (for example "openai" from "azure openai") are allowed too.
const allowWords = new Set([...allow].flatMap((e) => e.split(/\s+/)));
const isAllowed = (t) => allow.has(t.toLowerCase()) || allowWords.has(t.toLowerCase());

const STOP = new Set(['the', 'a', 'an', 'in', 'on', 'of', 'for', 'and', 'to', 'with', 'this', 'that', 'it', 'as', 'by', 'at', 'from', 'or', 'is', 'are', 'i', 'my', 'we', 'our', 'what', 'how', 'why', 'when', 'who', 'where']);

// True when the word at `index` starts a sentence, a bullet or a front-matter value (so its capital is not telling).
const startsSentence = (line, index) => {
  const prefix = line.slice(0, index).replace(/^[\s\-*#>•\d.]+/, '').trimEnd();
  return prefix === '' || /[.!?:;]$/.test(prefix);
};
const CONNECT = new Set(['of', 'and', 'for', 'the', 'de', 'des', 'du', 'la', 'le']);

const stripMd = (t) => t.replace(/`/g, '').replace(/\*\*/g, '');
// Source citations look like [file path – section]; drop them so file names are not treated as content.
const sourceText = stripMd(readFileSync(sourcePath, 'utf8').replace(/\[[^\]\n]*\]/g, ' '));
const draftLines = stripMd(readFileSync(draftPath, 'utf8')).split(/\r?\n/);

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const boundary = (token, flags) => new RegExp(`(?<![A-Za-z0-9])${escape(token)}(?![A-Za-z0-9])`, flags);

// ---- Candidate terms from the source -------------------------------------------------------------------
const cand = { acronym: new Set(), identifier: new Set(), phrase: new Set(), name: new Set() };

for (const m of sourceText.matchAll(/(?<![A-Za-z0-9])[A-Z][A-Z0-9&]*(?:-[A-Z0-9]+)*(?![a-z0-9])/g)) {
  if (m[0].length >= 2 && !isAllowed(m[0])) cand.acronym.add(m[0]);
}
for (const m of sourceText.matchAll(
  /(?<![A-Za-z0-9])(?:[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)+|[a-z]+(?:[A-Z][a-z0-9]+)+)(?![A-Za-z0-9])/g,
)) {
  if (!isAllowed(m[0])) cand.identifier.add(m[0]);
}

for (const line of sourceText.split(/\r?\n/)) {
  // Single capitalized words in the middle of a sentence (proper nouns, product names).
  for (const m of line.matchAll(/(?<![A-Za-z0-9])[A-Z][a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)*/g)) {
    const word = m[0];
    if (word.length < 3 || STOP.has(word.toLowerCase()) || isAllowed(word)) continue;
    if (startsSentence(line, m.index)) continue;
    cand.name.add(word);
  }

  // Runs of capitalized words (multi-word names), with every contiguous sub-phrase.
  const raw = line.split(/\s+/).filter(Boolean);
  let run = [];
  const flush = () => {
    for (let i = 0; i < run.length; i++) {
      if (CONNECT.has(run[i].toLowerCase())) continue;
      for (let j = i + 1; j < run.length; j++) {
        if (CONNECT.has(run[j].toLowerCase())) continue;
        const words = run.slice(i, j + 1);
        if (STOP.has(words[0].toLowerCase())) continue;
        const phrase = words.join(' ');
        const content = words.filter((w) => !CONNECT.has(w.toLowerCase()) && !STOP.has(w.toLowerCase()));
        if (content.length < 2 || isAllowed(phrase) || content.every(isAllowed)) continue;
        cand.phrase.add(phrase);
      }
    }
    run = [];
  };
  for (const token of raw) {
    const word = token.replace(/^[("'\[]+|[.,;:!?)"'\]]+$/g, '');
    const endsRun = /[.,;:!?]$/.test(token);
    if (/^[A-Z]/.test(word) || (run.length && CONNECT.has(word.toLowerCase()))) run.push(word);
    else flush();
    if (endsRun) flush();
  }
  flush();
}

// ---- Scan the draft ---------------------------------------------------------------------------------------
const flags = [];
const flag = (line, kind, token) => flags.push({ line, kind, token });

const patterns = [
  ['url', /https?:\/\/[^\s)]+|www\.[^\s)]+/gi],
  ['email', /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g],
  ['phone', /\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g],
  ['ip-address', /\b\d{1,3}(?:\.\d{1,3}){3}\b/g],
  ['hostname', /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:ca|gc\.ca|local|internal|corp|net|org|com)\b/gi],
  [
    'classification-word',
    /\b(?:protected\s+[abc]|top\s+secret|secret|unclassified|classified|confidential|cabinet\s+confidence|security\s+clearance|reliability\s+status)\b/gi,
  ],
];

draftLines.forEach((line, idx) => {
  const n = idx + 1;
  if (/^(order|draft|approval|category):/.test(line)) return;

  for (const [kind, re] of patterns) for (const m of line.matchAll(re)) flag(n, kind, m[0]);

  // Numbers other than plain years, unless they follow a known technology (for example "React 19").
  for (const m of line.matchAll(/(?<![A-Za-z0-9.-])\d[\d,.]*%?(?![A-Za-z0-9])/g)) {
    if (/^(19|20)\d{2}$/.test(m[0])) continue;
    const before = line.slice(0, m.index).match(/([A-Za-z.#+-]+)\s+$/);
    if (before && isAllowed(before[1])) continue;
    flag(n, 'number', m[0]);
  }

  for (const kind of ['acronym', 'identifier', 'name']) {
    for (const t of cand[kind]) {
      const m = boundary(t, '').exec(line);
      if (!m) continue;
      // A capitalized single word at the start of a sentence or value is not evidence of a leak.
      if (kind === 'name' && startsSentence(line, m.index)) continue;
      flag(n, `source-${kind}`, t);
    }
  }
  for (const t of cand.phrase) if (boundary(t, 'i').test(line)) flag(n, 'source-phrase', t);
});

// Verbatim runs of five or more words copied from the source.
const words = (t) => t.toLowerCase().match(/[a-z0-9']+/g) ?? [];
const shingles = new Set();
const sw = words(sourceText);
for (let i = 0; i + 5 <= sw.length; i++) shingles.add(sw.slice(i, i + 5).join(' '));
draftLines.forEach((line, idx) => {
  const dw = words(line);
  for (let i = 0; i + 5 <= dw.length; i++) {
    const s = dw.slice(i, i + 5).join(' ');
    if (shingles.has(s)) {
      flag(idx + 1, 'verbatim-run', s);
      break;
    }
  }
});

// ---- Report -----------------------------------------------------------------------------------------------
if (flags.length === 0) {
  console.log('leak-check: no flags.');
  process.exit(0);
}
flags.sort((a, b) => a.line - b.line || a.kind.localeCompare(b.kind));

// On each line, keep only the longest term: drop flags that are contained in another flagged term.
const nameKinds = new Set(['source-acronym', 'source-identifier', 'source-name', 'source-phrase']);
const shown = flags.filter(
  (f) =>
    !nameKinds.has(f.kind) ||
    !flags.some(
      (g) =>
        g !== f &&
        g.line === f.line &&
        nameKinds.has(g.kind) &&
        g.token.length > f.token.length &&
        g.token.toLowerCase().includes(f.token.toLowerCase()),
    ),
);

const seen = new Set();
for (const f of shown) {
  const key = `${f.line}|${f.kind}|${f.token}`;
  if (seen.has(key)) continue;
  seen.add(key);
  console.log(`L${f.line}  [${f.kind}]  ${f.token}`);
}
console.log(`\nleak-check: ${seen.size} flag(s). Reword or remove each one, or justify it in the review file.`);
process.exit(1);
