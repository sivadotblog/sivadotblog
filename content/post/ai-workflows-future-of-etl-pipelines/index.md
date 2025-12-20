---
title: "AI Workflows: Future of ETL Pipelines"
description: "What if, instead of writing pipelines, engineers just described the outcome. Here is my take on how AI Workflows will change the way data engineers build pipeline."
summary: "When code turns into conversation and workflows become contracts between humans and AI agents, how does data engineering change—and what exactly is a “pipeline” in that world?."
date: 2025-12-18T22:46:00-05:00
lastmod: 2025-12-18T22:46:00-05:00
draft: false
weight: 50
categories: ["Enterprise Strategies", "AI Strategies"]
tags: []
contributors: []
pinned: false
homepage: false
type: blog
seo:
  title: "AI Workflows: Future of ETL Pipelines"
  description: "What if, instead of writing pipelines, engineers just described the outcome. Here is my take on how AI Workflows will change the way data engineers build pipeline."
  canonical: ""
  noindex: false
---


Andrew Ng in his recent linkedIn post, shared a tiny aisuite snippet that lets an LLM spin up a complete Snake game: no game logic, just a prompt and an ai agent. The code hands the model disk access and a high‑level instruction ("create a Snake game, save it as HTML") and then gets out of the way. It just works.

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7404934835095547904?collapsed=1" height="553" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

For anyone who has ever written an actual game engine, watching a frontier model assemble UI, assets, and glue code from thin air is… mildly offensive and extremely inspiring. This made me wonder, what if this fun little experiment is actually pointing at something bigger—what happens if, instead of writing ETL code, we just write ETL prompts and let the engine figure the rest out?

## Lets Ideate

Today's reality is painfully familiar.

**Vendors** dump product feeds in whatever format makes their ERP happy.

**You** land them in a raw or bronze layer, often on an Delta/Iceberg‑backed lakehouse.

**Spark jobs** normalize, join, and shove everything into curated/gold tables that (hopefully) match a custom data model.

**What if** the only thing you ever wrote was a set of prompts and contracts? No hard‑coded ETL logic. No 2,000‑line Spark job. Just a mythical orchestration layer - call it **aiworkflow** - that wires LLM reasoning to MCP tools, schemas, and compute.

Here's how your workflow would likely look :

```python
# Workflow to Load Product datamart

import aiworkflow as aif
from mcp_clients import filesystem_mcp, spark_mcp, metadata_mcp

# 1. Tools: filesystem for files, Spark for compute, metadata for governance
fs_tools = filesystem_mcp.get_callable_tools()
spark_tools = spark_mcp.get_callable_tools()
meta_tools = metadata_mcp.get_callable_tools()

model = "openai:gpt-5.1"  # or your favorite frontier model

# 2. Prompt: understand vendor files and derive metadata
read_vendor_prompt = """
You are a data ingestion planner.

Task:
- Inspect headers and a sample of each vendor file.
- Infer file format, schema, row counts, and approximate size.
- Propose a canonical metadata spec for each file:
  - vendor_name
  - table_name
  - columns (name, type, nullable)
  - primary keys / natural keys
  - partition candidates

Return JSON: { "files": [ ... ], "errors": [ ... ] }.
"""

file_scan = aif.execute(
    prompt=read_vendor_prompt,
    tools=fs_tools,
    model=model,
    workflow_id="discover_vendor_feeds",
)

# 3. Prompt: design and build the bronze/raw layer
bronze_prompt = """
You are a lakehouse ETL planner using Apache Spark and an open table format (e.g., Iceberg).

Input:
- Vendor file metadata: {{ file_scan.response.files }}

Goals:
- For each vendor file, create a raw/bronze table in schema `product_raw`.
- Use an Iceberg-compatible DDL with:
  - schema matching the source
  - hidden partitioning on ingestion_date and vendor_name
- Generate PySpark code that:
  - reads the file in its native format
  - writes to an Iceberg table with append-only semantics
  - logs invalid records to `product_raw.ingest_errors`
"""

bronze_workflow = aif.execute(
    prompt=bronze_prompt,
    tools=[*fs_tools, *spark_tools],
    model=model,
    workflow_id="build_bronze_layer",
)

# 4. Prompt: conform to the enterprise product model
datamart_prompt = """
You are a data modeling assistant aligned with the OpenMetadata-based product standard v3.2.1.

Input:
- Raw vendor tables in schema `product_raw`.
- Enterprise product model from the metadata catalog.

Goals:
- Propose a unified `product` table in schema `product_core`:
  - columns, types, business definitions
  - mapping rules from each vendor's raw table
- Generate PySpark + SQL code that:
  - reads all `product_raw.*` tables
  - applies mappings and basic data quality rules
  - writes to `product_core.product` as an Iceberg table
- No business rules may be hardcoded; all must be derived from
  the metadata model supplied by the catalog tools.
"""

datamart_workflow = aif.execute(
    prompt=datamart_prompt,
    tools=[*spark_tools, *meta_tools],
    model=model,
    workflow_id="build_product_core",
)

print("✓ Workflows defined. Agents, take it from here.")
```

This would be a magical experience, **a chain of AI agenths that** discovers files, feeds bronze catalog and finally the product model. The LLM pushes the plan; MCP tools do the real work.

## The Recipe: What is the thought process?

I dont believe that is far‑fetched. With today's LLMs, MCP, and open table formats, you could build a very real version of this pattern.

### Ingredients

**MCP servers** that can:

- Read vendor files from the lakehouse and stream headers/samples to the LLM.
- Run Spark jobs over Iceberg tables in your data lake.
- Expose your product data model from a catalog like OpenMetadata as machine‑readable schemas and constraints.

**An LLM agent runtime** (aisuite, custom, whatever) that can orchestrate multi‑step tool calls.

**A frontier model** of your choice, plus a place to store prompts and guardrails.

**Vendor files**, ideally landing in a file system.

### Recipe

- The LLM uses filesystem MCP tools to read headers and sample rows, then emits structured metadata (schema, types, likely keys, size, quality signals).

- That metadata is stored in a catalog table and becomes the contract for everything downstream.

- Given those contracts, the agent asks a Spark MCP tool to create Iceberg tables that mirror each feed, choosing partitions based on volume and access patterns.

- Ingestion code (PySpark) is generated and executed by the tool; bad records are routed to a shared error table with audit columns, not silently dropped.

- Another MCP tool exposes your OpenMetadata‑backed product schema and rules.

- The agent generates mapping logic from each vendor's raw table into the canonical product model and asks Spark tools to run it, producing curated tables.

- When schemas drift, new vendors arrive, or volumes spike, the LLM doesn't patch code; it updates metadata and regeneration prompts.


**In this world, engineers own contracts and prompts, not brittle pipelines.**

### What This Quietly Eliminates

For example, take the **data model** itself. A generic "product store" has been modeled a million, if not a billion, times already. That's exactly why standards like OpenMetadata exist in the first place, so you don't reinvent a product schema every time a new vendor shows up. In this workflow, aiworkflow doesn't invent its own structure; it simply reads the canonical model from the catalog and treats it as law.

Next, take the **glue work** you do every single day. As long as you are passing rich metadata into a PySpark job, building a dataframe, repartitioning it, and landing it into a raw Iceberg table is mostly muscle memory. Imagine you get 1 million records today and only 100 tomorrow; the agent, via MCP, can ask Spark for 200 workers on day one and a single worker on day two, with the partitioning strategy adjusted on the fly. No guesswork, no engineer hand‑tuning job configs at 2 a.m.

Finally, take **business logic**. For instance, instead of hiding discount rules or eligibility criteria in a 3,000‑line transformation job, those rules now ive in metadata and policy tables exposed via MCP tools. The code path just says "apply the product normalization rules for this region" and the agent asks the catalog what that actually means. Business teams can own and evolve the rules; engineers own the contracts, not the if‑else forests.

## A Note of Caution

Ever AI projects get funded, every team spinning up their own "fun little agent" and every technology has a copilot. We are in a an era I would call "AI Silos". Autonomy without discipline is just an expensive chaos. Enterprises need to bring in cost discipline into they AI journey from the ground up. LLM is not the default solution.

Next, Observability and guardrails matter more than clever prompts. When an AI agent mis‑loads product data, there is no stack trace; there is only a chain of tool calls and a prompt that "felt right at the time". Who will you assign that bug to? another AI agent?

Most importantly, humans are still required in the loop. While am not conerned about AI reaching its singularity anytime soon, Enterprises should continue to have Humans in the Loop. Thats not optional, thats imperative. Someone needs to review mappings, sign off on business rules, and decide when the model is allowed to rewrite its own workflows. That's governance, not a process bottleneck.

Will we ever get "true" zero ETL?  The effort to Kill ETL goes baack far as 2010 with stream applications such as kafka and flink promising real time no code pipelines. AWS announced its Redshift-Aurora zero‑ETL integrations around 2022. Vendors like Confluent and Databricks have reused the phrase to describe patterns where data is streamed or replicated straight into analytic stores, while the transformation logic quietly shifts into configs, metadata, and managed services instead of hand‑written jobs.

A world where data engineers transition into prompt and workflow engineers, curating contracts instead of debugging glue code, is entirely within reach. If a snake game can be conjured from a single prompt, the least we can do is retire a few thousand lines of hand‑rolled product ingestion logic.
