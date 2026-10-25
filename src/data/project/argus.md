---
title: 'Argus'
tagline: 'A health checker with no code in it.'
description: 'Watches vendor status pages, Azure databases and web apps, MongoDB Atlas and Snowflake access logs with nothing but OpenTelemetry Collector configuration.'
image: '~/assets/images/project/argus.jpg'
status: 'prototype'
date: 2026-10-25
tech:
  ['OpenTelemetry Collector', 'Docker Compose', 'Kubernetes', 'Azure Monitor', 'MongoDB Atlas', 'Snowflake', 'Splunk']
links:
  - label: 'Source'
    url: 'https://github.com/sivadotblog/argus'
    primary: true
---

The first version of Argus was a Python program. It had a scheduler and a plugin per target type, plus a connector contract I was quietly proud of. The test suite mocked every call, and it ran. Then I read back through what I'd built and saw that most of it already existed, better maintained, in the binary I was putting in front of it anyway.

Argus printed JSON lines so an OpenTelemetry Collector could pick them up. And the collector already schedules checks and retries requests. It parses responses too, and it exports to almost any backend you'd name. So I was keeping a private copy of the thing that sat downstream of me, with my own bugs in it.

This version of Argus is the same project with the code taken out. It's six YAML files for the stock contrib collector image, pinned to one version, with no Dockerfile and no custom build.

Argus Panoptes is the giant from Greek myth with a hundred eyes, set to watch one thing, and he never had all of them shut at once. The name fit the first version, and it fits this one better. Every check here is one eye on one service in one region, and adding an eye is a few lines of YAML.

Each file is one layer, and the collector merges them in order. The public layer checks the status feeds of Snowflake, Databricks and HashiCorp, plus this site, and it runs with no credentials at all. A second layer pulls Azure Monitor metrics for App Service, PostgreSQL, Azure SQL, Cosmos DB and Redis across a whole subscription. You can narrow that to resource groups, but the default is the broad scope. The last two read MongoDB Atlas metrics and Snowflake's account usage history, one log record per row.

The part I enjoyed most was regions. My platform lives in Azure East US and East US 2, so a Databricks incident in Japan East isn't my incident. None of the three vendor APIs takes a region parameter, though. Each one answers with the whole world, in its own shape.

Databricks nests every region under every service. Snowflake makes each region a component group with its own status. HashiCorp, well, lists only what's broken, and repeats the same region names under several products, so the only safe key is a component ID.

So how do you filter that without code? The collector's HTTP check receiver can read the response body, evaluate a gjson path and compare the result to an expected value. A region filter becomes one target with one rule: is Compute in East US still "Operational"? I name each check in the URL fragment, like `#databricks.compute.eastus`. The HTTP client never sends the fragment to the server, but it stays on the metric, and that's how the output tells regions apart.

Think of it like a building's fire panel. One wire per zone, and a light that says which floor tripped. You add a wire when you add a question.

And how do you test something with no code in it, right? You test whether the collector accepts the config, and whether it gives the right answer. I recorded each feed and made a degraded copy: Snowflake East US 2 degraded, Databricks Compute degraded in East US, one HCP Vault region affected. A test serves those files on a Docker network with no route out, and it checks that exactly the right six checks fail while Compute in East US 2 still passes next to a broken East US.

A second test starts the whole profile with placeholder credentials. The collector's `validate` command will happily pass a config whose extension list is missing an entry, and you only find out at startup. I found that one by watching it happen.

On the first live run, Snowflake reported a partial degradation. The overall Snowflake check failed and both Azure East regions passed, which told me I could go back to my coffee.

Status is prototype. The public checks are tested, offline against recorded feeds and live against the real ones. The other three layers are configured and validated against the receiver source, but they haven't met a real account yet. And the HashiCorp check assumes the shape of an affected component, because the feed had none when I captured it.

It costs something, of course. Five Databricks checks fetch the same feed five times a minute, because one rule per target is what keeps each answer clean. And Snowflake's account usage views fill in hours late, so the log queries deliberately wait them out instead of guessing.

Argus still has a hundred eyes. These days they belong to the collector.
