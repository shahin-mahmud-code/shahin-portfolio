import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: './content' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    name: z.string().min(1),
    location: z.string().min(1),
    role: z.string().min(1),
    tagline: z.string().min(1),
    links: z.array(z.object({ label: z.string().min(1), href: z.url() })).min(1),
    skills: z
      .array(z.object({ label: z.string().min(1), items: z.array(z.string().min(1)).min(1) }))
      .min(1),
    education: z
      .array(z.object({ degree: z.string().min(1), school: z.string().min(1), year: z.string().min(1) }))
      .min(1),
  }),
});

// Case studies. Work-derived projects (category "work") may only be published once the owner has confirmed
// departmental approval (`approval: approved`); until then they must stay `draft: true`. See AGENTS.md.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z
    .object({
      title: z.string().min(1),
      summary: z.string().min(1),
      category: z.enum(['personal', 'university', 'work']),
      period: z.string().min(1),
      role: z.string().min(1),
      organization: z.string().min(1).optional(),
      stack: z.array(z.string().min(1)).min(1),
      outcome: z.string().min(1),
      links: z.array(z.object({ label: z.string().min(1), href: z.url() })).default([]),
      order: z.number().int().default(100),
      draft: z.boolean().default(false),
      approval: z.enum(['not-applicable', 'pending', 'approved']).default('not-applicable'),
    })
    .refine((p) => p.draft || p.category !== 'work' || p.approval === 'approved', {
      message: 'A published work project needs `approval: approved` (departmental approval confirmed by the owner).',
      path: ['approval'],
    }),
});

export const collections = { home, projects };
