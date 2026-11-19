import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    location: z.string().optional(),
    format: z.string().optional(),
    summary: z.string().optional(),
    image: z.string().optional(),
    registrationUrl: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    summary: z.string().optional(),
    image: z.string().optional(),
    pdf: z.string().optional(),
  }),
});

export const collections = { events, publications };
