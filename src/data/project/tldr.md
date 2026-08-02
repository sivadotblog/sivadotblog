---
title: 'TLDR Archives + Search'
description: 'A daily-archived, fully searchable mirror of the TLDR newsletter, with a semantic search API and UI layered on top.'
status: 'wip'
date: 2026-08-01
link: 'https://github.com/sivadotblog/tldr'
---

## High-level summary

TLDR Archives started as a simple problem: the TLDR newsletter has no searchable archive. This project fixes that in two layers — a data layer that mirrors every issue permanently, and a search layer that makes the whole archive queryable in natural language instead of by date.

## Design

- **Archive pipeline**: a GitHub Actions workflow (`daily_newsletter.yml`) pulls each day's newsletter per category and commits it as markdown into the repo; a companion backfill workflow (`backfill_newsletter.yml`) fills in historical issues. The archive itself is published as a static MkDocs site.
- **Chunking + embeddings** (`search/`): splits each newsletter into one document per story, stripping footers, sponsor blocks, and self-promo, then upserts into MongoDB Atlas. Atlas `autoEmbed` handles vectorization via Voyage AI server-side — no local embedding model to run or version. Upserts are keyed on a deterministic `{category}/{date}#{ordinal}` id, so reloading the same newsletters is idempotent.
- **Search API** (`api/`): a thin FastAPI service with one real endpoint, `GET /api/search`, that runs Atlas `$vectorSearch` with `autoEmbed` — the query text is passed straight through and embedded server-side.
- **UI** (`ui/`): an Astro front end over the search API for exploring the archive conversationally.

Full design notes live in `docs/superpowers/specs/2026-08-01-tldr-search-design.md` in the repo.
