# Navigation redesign + Projects section

Date: 2026-08-01

## Context

The current top nav has an "Articles" dropdown (All Posts + 5 category links + 1 tag link), plus standalone "About", "My Reflections", and "Contact" links. This is being replaced with a flat, GitHub Next–style nav (https://githubnext.com/): a short list of top-level destinations with no dropdowns.

GitHub Next's nav is flat text links (Home, Projects, Posts, Talks, People). Its Projects section is a card grid: image, date + status badge (e.g. "Research Prototype", "WIP"), title, short description, each card linking to a detail page.

## Goals

1. Replace the nav with 4 flat items: **Posts / Projects / Books / About**.
2. Add a **Projects** section (`/projects/`) — index grid + per-project detail pages — mimicking the GitHub Next card pattern. Ships with 4 placeholder entries; real project content is a follow-up task.

## Non-goals

- Filling in real project content (placeholders only this round).
- Removing or rewriting the underlying `category`/`tag` taxonomy system — it stays as-is internally, just isn't surfaced as a nav dropdown.
- Deleting the 7 "reflections"-category posts, or the `/contact` page.

## 1. Navigation changes (`src/navigation.ts`)

Replace `headerData.links` with:

```ts
links: [
  { text: 'Posts', href: getBlogPermalink() },
  { text: 'Projects', href: getPermalink('/projects') },
  { text: 'Books', href: getPermalink('best-reads', 'category') },
  { text: 'About', href: getPermalink('/about') },
],
```

- Removes the "Articles" dropdown (All Posts, AI Strategies tag link, Enterprise Strategies / Data Platforms / Platform Engineering / Techno Bytes / Observability category links). These categories/tags remain functional at their existing URLs — just no longer linked from the nav.
- Removes the standalone "My Reflections" link. The 7 posts with `category: reflections` are **not deleted** — they stay published, listed on the main Posts index, and reachable at their existing category URL.
- Removes the standalone "Contact" link. The `/contact` page is not deleted; instead the About page (`src/pages/about.astro`) gets a "Get in touch" link/button pointing at `/contact`.
- "Books" points at the existing category page for `best-reads` (already used by the 9 "Best Reads YYYY" posts) — reuses the current category-listing template, no new page.

`Header.astro` requires no changes — it already renders a flat `<a>` for any link without a nested `links` array; the dropdown branch simply won't trigger once no nav entry has sub-links.

## 2. Projects content collection

New collection in `src/content.config.ts`, alongside `postCollection`:

```ts
const projectCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/project' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    status: z.enum(['prototype', 'wip', 'live', 'archived']).optional(),
    date: z.date().optional(),
    link: z.url().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
```

- Independent of the `post` collection and the `APP_BLOG` pagination/taxonomy config — projects don't need tags, categories, RSS, or pagination at this scale (4 items).
- `link` is an optional external URL (repo/live site) shown as a CTA on the detail page.
- `draft` follows the same convention as posts (excluded from listing when true, if set).

## 3. Routes and components

- `src/pages/projects/index.astro` — fetches all non-draft entries from the `project` collection sorted by `date` descending, renders `src/components/projects/Grid.astro`.
- `src/components/projects/Grid.astro` — responsive grid wrapper (mirrors `src/components/blog/Grid.astro` layout classes), maps entries to `GridItem`.
- `src/components/projects/GridItem.astro` — card: image (falls back to a neutral placeholder block if `image` is absent, same pattern as `blog/GridItem.astro`), status badge (from `status`, styled as a small pill), title, description, whole card links to `/projects/<slug>/`.
- `src/pages/projects/[slug].astro` — detail page: title, image, status/date, rendered markdown body via `render()`, optional `link` CTA button. Modeled on `SinglePost.astro` but simplified — no tags, no category, no related-posts section.
- Slugs come from the file id (`project-one.md` → `/projects/project-one/`), consistent with how blog post slugs are derived from file id via `cleanSlug`.

## 4. Placeholder content

4 files under `src/data/project/`:

- `project-one.md`, `project-two.md`, `project-three.md`, `project-four.md`
- Each has a generic title (e.g. "Project One"), a one-sentence placeholder description, `status: prototype`, and a `date` staggered across recent months so the grid ordering is visibly correct. No `image` or `link` (exercises the fallback/no-CTA paths).

## Testing / verification

- `npm run check` (astro check + ESLint + Prettier) passes.
- `npm run build` succeeds; `/projects/`, `/projects/project-one/` etc. and `/categories/best-reads/` appear in `dist/`.
- Manual check in dev server: nav renders 4 flat items with no dropdown chevrons, About page shows a Contact link, Projects grid renders 4 cards linking to working detail pages, Books nav item lands on the existing Best Reads category listing.
