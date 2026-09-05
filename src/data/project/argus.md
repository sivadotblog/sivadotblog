---
title: 'Argus'
tagline: 'A hundred eyes, one process.'
description: 'Polls every endpoint, API, cloud status feed and database you care about on its own schedule, and prints one JSON line per result.'
image: '~/assets/images/project/argus.jpg'
status: 'prototype'
date: 2026-07-29
tech: ['Python', 'asyncio', 'uv', 'Docker', 'Kubernetes', 'OpenTelemetry']
links:
  - label: 'Source'
    url: 'https://github.com/sivadotblog/k8s-experiments/tree/main/healthcheck-engine'
    primary: true
---

Every platform team I have worked on ends up with the same drawer of junk. A cron job that curls an endpoint. A Lambda that checks a cloud status page. A script someone wrote to watch subnet capacity, three separate notification paths, and nobody left who is sure which of them still runs. Each one was five minutes of work. Together they are a small unmaintained system that nobody owns.

They all do the same thing. Ask something a question on a timer, record the answer. So that is one program.

Argus Panoptes is the giant from Greek myth with a hundred eyes, set to watch one thing, and he never had all of them shut at once. That is a fair description of a single asyncio process running fifty independent check loops.

The output is JSON lines on stdout. That is the entire interface. One line per check result, plus a periodic heartbeat so that silence reads as death rather than calm. And then nothing else. No metrics endpoint, no exporter, no push gateway, no alert rules, no retention policy. An OTEL collector scrapes it, Splunk ingests it, or you pipe it through `jq` while debugging. And all three work the same way, because there is only one output path and it is the boring one.

So each target type is a plugin, picked by a `type` field in YAML. Public HTTP endpoints, authenticated APIs, cloud provider status feeds, Azure VNet and quota capacity, databases. Each runs on its own interval. A status page every five minutes, a database every thirty seconds, and neither blocks the other.

A connector implements one coroutine, `async def check(self) -> CheckResult`, and every failure it meets becomes a return value. Timeouts, DNS failures, transport errors, malformed responses. All of it gets caught and emitted as a `DOWN` or `ERROR` line like any other result, enforced by convention and by tests. And a health checker that crashes when the thing it watches breaks has become a second outage.

So should you just use Prometheus? For most of this, yes. That problem is solved, and I am not solving it again. But the gap Argus sits in is narrower. A third-party API that either answers or does not. A status feed that is a JSON document. A quota number behind an authenticated management call. Those expose nothing to scrape, and what comes back from them is an event rather than a time series: a timestamp, a latency, a status, an error string. That last one belongs in the log store, next to the application logs from the same incident.

Status is prototype, honestly. It runs. The test suite mocks every external call so it never needs live credentials or a network, it is packaged with `uv` and containerized, and the Kubernetes manifests are already sitting in the repo: a ServiceAccount, a ConfigMap for the check definitions, a Deployment. But it has not met a real week yet. Every interesting failure here is operational: config reload, credential rotation, a target that hangs instead of failing.
