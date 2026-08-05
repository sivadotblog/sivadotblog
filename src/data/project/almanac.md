---
title: 'Almanac'
tagline: 'What if you could ask your news archive a question?'
description: 'Keeps a permanent, dated record of daily tech news and lets you search it by meaning instead of by date.'
image: '~/assets/images/project/almanac.jpg'
status: 'wip'
date: 2026-08-01
tech: ['GitHub Actions', 'MkDocs', 'MongoDB Atlas', 'FastAPI', 'Astro']
links:
  - label: 'Source'
    url: 'https://github.com/sivadotblog/tldr'
    primary: true
---

I read tech newsletters every morning and retain almost none of it. About once a month I remember that someone wrote something about this - a funding round, a deprecation, a benchmark - and have no way back to it. The newsletters arrive, get skimmed, evaporate. And even if I kept an archive, one you navigate by date is only useful if you remember the date, which is the one thing I never do.

The actual problem isn't storage, it's that the thing I want to search by - meaning - isn't what these archives are indexed by. Almanac fixes both halves.

## Two layers

A scheduled workflow pulls each day's newsletters, one file per category, and commits them as markdown straight into the repo. A backfill job walks backwards through history filling in what came before. Git is the storage engine - every issue is a file, every day is a commit, and the whole archive is browsable as a static site without anything running.

A second pipeline reads those files and turns them into something answerable, and that's where the interesting decisions live. Keeping the two layers separate matters more than it sounds: the record has to survive the index being wrong. I've changed how chunking works twice, and each time I just rebuilt the index from files that were never at risk. The archive is the durable thing; search is a view over it.

## Search that isn't keyword search

The chunking step splits each issue into one document per story, not one per newsletter, and that's the single most consequential choice in the project. A newsletter issue is fifteen unrelated items stapled together by nothing but the date - embed it as one blob and the resulting vector means almost nothing. Per-story, each vector is about one thing, and similarity search starts to actually work.

The same step strips footers, sponsor blocks, and self-promotional filler, which are near-identical across every issue and would otherwise dominate the embedding space with noise that's everywhere and distinguishes nothing. Documents go into MongoDB Atlas, where server-side auto-embedding handles vectorization, so search is a single endpoint: query text in, vector search out.

## Choices I'd defend

Embedding server-side rather than locally, mainly. Running my own model means owning a model version, a runtime, and a specific failure mode where index and query get embedded by different model versions and results go subtly wrong instead of obviously broken. Pushing embedding to the same service that stores the vectors rules that out. I gave up model choice for it, and I'd make the trade again.

Every document's id is derived from category, date, and position in the issue, so re-running the loader over the same newsletters is a no-op instead of a duplication event - a small thing, but it's the reason I can re-run the whole pipeline without worrying about it, which is the reason it actually gets iterated on.

Markdown in git instead of a document store: slower to query, harder to lose, diffable, readable in thirty years by anything that can read text. For an archive whose whole premise is permanence, that's the right trade.

And the API only does search. No auth, no ranking config, no filtering DSL, no pagination beyond the obvious - each of those is something I'd have to maintain for capability I don't need yet.

## Open questions

Honest status: the archive layer is solid and running daily, the search layer works and is being tuned, and the interface is the least finished part.

Three things I haven't resolved. Recency weighting - a story about a model release from two years ago and one from last week are equally "similar" to a query about new model releases, and they shouldn't be. Deduplication across categories - the same story often lands in three newsletters the same morning, and search returns all three. And whether the interface should be search at all, or something more conversational where the archive is context rather than results.

The record keeps growing either way, which was the point of building it in that order.
