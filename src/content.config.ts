import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/** Journal articles. Files live in src/content/journal/{ro,en}/. `key` links the two language versions. */
const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    key: z.string(),
    lang: z.enum(["ro", "en"]),
    slug: z.string(),
    drawing: z.enum(["stool", "firepit", "table", "hall", "solar", "part", "railing", "laser", "weld", "plasma", "bend"]),
    service: z.string(),
  }),
});

export const collections = { journal };
