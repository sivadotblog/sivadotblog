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

I read tech newsletters every morning and retain almost none of it. Once a month something surfaces, a funding round or a deprecation I know I read about, and I have no way back to it. An archive sorted by date only helps if you remember the date. And that is the one thing I never remember.

An almanac is a book of dated record, published once and mostly useful in the years after. That is the half of this I care about. The archive is the product, and search is a view over it.

So Almanac keeps two layers apart.

The first is the record. A scheduled GitHub Actions workflow pulls each day's newsletters, writes one markdown file per category, and commits them into the repo. A backfill job walks backwards through history, filling in what came before. Every issue is a file. Every day is a commit. And the whole archive browses as a static MkDocs site with nothing running behind it.

The second is the index. A separate pipeline reads those files, splits each issue into one document per story, and loads them into MongoDB Atlas, where server-side auto-embedding handles the vectors. So search is a single FastAPI endpoint. Query text in, matches out.

Per-story chunking is the decision everything else rests on. Split each issue by story and every vector is about one thing, which is the condition under which similarity search does anything at all. Embed the issue whole and you get one vector averaging fifteen unrelated items that were stapled together by nothing except the morning they happened to arrive, a vector that gestures at all of them and lands on none. The same step strips footers and sponsor blocks. They repeat near-verbatim across every issue, and they would otherwise crowd the embedding space with text that is everywhere and distinguishes nothing.

And why keep the record and the index in separate pipelines? Because I have changed the chunking twice. Both times I rebuilt the index from files that were never at risk.

Two things I have not worked out. A story about a model release from two years ago scores the same as one from last week, and recency has to count for something. And the same story lands in three newsletters on the same morning, so search hands back all three.

The archive keeps growing either way. That was the point of building it in that order.
