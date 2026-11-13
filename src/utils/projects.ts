import { getCollection } from 'astro:content';

export const categoryLabel = {
  personal: 'Personal project',
  university: 'University project',
  work: 'Professional project',
} as const;

/** Prefix a site path with the configured `base` so links work on GitHub Pages. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Published (non-draft) projects, in display order. */
export async function getPublishedProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
