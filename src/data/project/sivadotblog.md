---
title: 'siva.blog'
tagline: "The site you're currently reading, explaining itself."
description: 'A static Astro site for posts, projects and reading notes - no server, no database, no comments.'
image: '~/assets/images/project/sivadotblog.jpg'
status: 'live'
date: 2026-08-01
tech: ['Astro', 'Tailwind CSS', 'MDX', 'TypeScript']
links:
  - label: 'Source'
    url: 'https://github.com/sivadotblog/sivadotblog'
    primary: true
---

I have rebuilt this site more times than I have written anything worth reading on it. Pick a platform, fight the theme, add a plugin because the theme will not do the one thing, then add three more because the first one broke. Six months later there is a database to back up, a runtime to patch, and an empty comment section. And the writing has quietly stopped, because the site became the hobby.

So this version started from a constraint instead of a feature list. Nothing may run. Markdown files in a repo, compiled to HTML, left alone. No server, no database, no admin login, no scheduled job, no dependency I am obliged to keep patched.

It is built on AstroWind, with Astro v6 and Tailwind v4. Content is two collections, posts and projects. Both are loaded from markdown and MDX by the Content Layer `glob()` loader, with a Zod schema on each. Why bother with a schema on a personal site? Because it stops me inventing a new frontmatter field every time I sit down, which is how the last few versions of this thing slowly rotted. Routing is file-based. Images go through `astro:assets` and come out as Sharp-optimized WebP. And the build produces a static `dist/`, compressed and sitemap-indexed. It is files.

Three rules I write to.

**One idea per post, and the title is the idea.** If I cannot name the argument in the title, I do not have one yet. Every vaguely titled post here is one that did not know what it was about.

**No comments.** Moderation, spam, a database and a runtime is a lot of upkeep for a reply that could live on a platform people already use.

**Nothing gets deleted.** Old posts keep their slugs, including the ones I would argue with now. Things that move get redirected.

And here is the one I would rather not admit. I shipped with the starter theme's own copy still sitting in the blog index, a subtitle describing this site as a framework demo, across five paginated pages, for months, and nobody told me. That is the failure mode of building on a good starter. The parts you never had to think about are the parts you never look at again.

And the other thing I got wrong was naming. Everest was called Stock Threshold Analyzer, which is accurate, descriptive and completely forgettable, a category label doing the work of a name. This site kept its boring name on purpose. It is my domain and a TLD, and there is nothing in it to decode.

This page is generated from the repo it links to, so the commit history has the rest.
