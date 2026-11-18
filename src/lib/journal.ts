import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export type Post = CollectionEntry<"journal">;

export async function postsFor(lang: Lang): Promise<Post[]> {
  const all = await getCollection("journal", (p) => p.data.lang === lang);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The same article in the other language (matched by `key`). */
export async function counterpart(post: Post): Promise<Post | undefined> {
  const other: Lang = post.data.lang === "ro" ? "en" : "ro";
  const list = await getCollection("journal", (p) => p.data.lang === other && p.data.key === post.data.key);
  return list[0];
}

export const readingMinutes = (body = "") => Math.max(1, Math.round(body.split(/\s+/).length / 200));

export const formatDate = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === "ro" ? "ro-RO" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
