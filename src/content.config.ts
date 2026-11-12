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

export const collections = { home };
