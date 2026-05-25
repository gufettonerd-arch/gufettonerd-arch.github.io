import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ideas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ideas' }),
  schema: z.object({
    titolo: z.string(),
    descrizione: z.string(),
    stato: z.enum(['parcheggiata', 'in-sviluppo', 'completata', 'abbandonata']),
    categoria: z.string(),
    data: z.coerce.date(),
    tag: z.array(z.string()).optional().default([]),
    commenti: z.boolean().optional().default(false),
  }),
});

export const collections = { ideas };
