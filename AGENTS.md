# AGENTS.md

Personal portfolio website for Shahin Mahmud. Audience: recruiters and Government of Canada hiring managers.
Static site deployed to GitHub Pages: https://shahin-mahmud-code.github.io/shahin-portfolio/

## Stack and commands

- Astro 7 + TypeScript (strict). Plain CSS with custom properties in `src/styles/`.
- No UI framework until needed. Add React islands only where real interactivity is required.
- Node >= 22.23.4 is the minimum Astro supports (`engines` in package.json). `.nvmrc` and CI both use Node 26 (LTS).
- `npm run dev`, `npm run check` (type-check), `npm run build`, `npm run preview`.
- `base` is `/shahin-portfolio`. Every internal link and asset path must respect `import.meta.env.BASE_URL`.
  When a custom domain is added, remove `base` and update `site` in `astro.config.mjs`.
- Astro 7 compiles HTML strictly: no unclosed tags, no invalid nesting. Whitespace between inline elements is
  collapsed, so use block elements and CSS gaps instead of relying on spaces.

## Staged build (one stage at a time, do not build ahead)

1. Live skeleton: hero, about, skills, education, links, CI deploy.
2. Layout, design system, accessibility baseline (nav, dark-mode toggle, axe and Lighthouse checks in CI).
3. Projects: Markdown-driven case studies (problem, role, stack, outcome).
4. Experience, résumé page and contact.
5. Polish: SEO and Open Graph, custom domain, optional analytics.
6. Optional: writing, interactive demos.

## Content safety (non-negotiable)

This repository and the site are public. The owner's employer-related information is sensitive.

- Never add: employer-internal system or application names, hostnames, URLs, architecture details, user counts,
  team or org names, screenshots or data from work systems, classification markers, personnel-security information,
  phone number, or home address.
- Work-derived write-ups describe generalized patterns and outcomes only, and only after the owner confirms
  departmental approval.
- Personal projects may carry real detail.
- Never commit the résumé source or anything under `private/`.
- If unsure whether something is publishable, leave it out and ask.

## Accessibility (target WCAG 2.2 AA)

Semantic HTML, one `h1`, ordered headings, landmarks, skip link, visible focus, contrast of at least 4.5:1 for text
and 3:1 for UI components, `prefers-reduced-motion` and `prefers-color-scheme` respected, no meaning carried by
colour alone, descriptive link text, `lang` set. Check by keyboard before finishing.

## Style

- English only. Keep URLs and structure ready for a French version if it is requested later.
- System font stack until fonts are self-hosted. No third-party font CDNs.
- No third-party scripts or trackers without asking.
- Own visual identity. Do not reproduce another site's design.
- Small commits with imperative-mood messages.

## Definition of done

`npm run check` and `npm run build` pass, keyboard and contrast checked, content-safety rules re-read.
