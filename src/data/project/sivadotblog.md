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

I've rebuilt this site more times than I've written anything worth reading on it. Pick a platform, fight the theme, add a plugin because the theme won't do a thing, add three more because the first one broke. Six months later there's a database to back up, a runtime to patch, a comment section with nothing in it, and the writing has quietly stopped because the site became the hobby instead of the output.

So this version started from a constraint, not a feature list: nothing may run. No server, no database, no admin login, no scheduled job, no dependency I'm obliged to keep patched. Markdown files in a repo, compiled to HTML, and left alone.

## How it's put together

Built on [AstroWind](https://github.com/onwidget/astrowind), Astro v6, Tailwind v4.

Content is two collections - posts and projects - loaded from markdown and MDX by the v6 Content Layer `glob()` loader, each with a Zod schema. The schema mostly exists to stop me from inventing a new frontmatter field every time I sit down to write, which is how the last few versions of this site slowly rotted.

Routing is file-based: dynamic pagination for the post list, taxonomy pages for categories and tags, and a parallel index/detail route for the project collection you're on right now. Styling is Tailwind v4, CSS-first, theme variables, class-based dark mode - no config file of arbitrary values to relearn every time I touch it. Images go through `astro:assets` and get Sharp-optimized into WebP at build; remote images route through a CDN. The build spits out a static `dist/`, compressed and sitemap-indexed. It's just files.

## Rules I write to

**One idea per post, and the title is the idea.** If I can't name the argument in the title, I don't have one yet - every vague-titled post on here is one that didn't know what it was about.

**No comments.** The value of a comment section on a personal site is close to zero, and the upkeep - moderation, spam, a database, a runtime - is exactly what this rebuild was for. Replies can live on whatever platform people are already using.

**The reading list is a series, not a category.** Same post, same title, every year for twelve years. The repetition is the point - it's the one thing on this site that shows change over time, and it only works because the format never moves.

**Projects get pages, not READMEs.** A README tells you how to run something. A project page has to say why it exists and what I actually believe about the problem.

**Nothing gets deleted.** Old posts keep their slugs, including the ones I'd argue with now. Things that move get redirected, never 404'd.

## Things I got wrong the first time

Shipped with the starter theme's copy still in the blog index - a subtitle describing itself as a framework demo, on five paginated pages, for months, and nobody told me. That's the common failure mode of building on a good starter: the parts you never had to think about are the parts you never look at again.

Project pages started as one template and never left it - same two headings, summary then a bulleted list, because that's what I wrote for the first project and the second one copied it. By the fourth, the shape was uniform enough to look machine-generated.

And I named things after what they do. "Stock Threshold Analyzer" is accurate and completely forgettable - a category label, not a name. Renaming the projects was a small change that made them feel like things again instead of entries in a list.

This page is generated from the repo it links to, so all three mistakes are sitting in the commit history if you want to go dig them up.
