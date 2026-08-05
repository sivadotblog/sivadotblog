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

Every platform team I've worked on ends up with the same drawer of junk: a cron job that curls an endpoint, a Lambda that checks a cloud status page, a script someone wrote to watch subnet capacity, three different notification paths, and nobody quite sure which of them still runs. Each one was five minutes of work. Together they're a small unmaintained system that nobody owns.

What they all actually do is identical: ask something a question on a timer and record the answer. That's one program, not nine. Argus is that one program - named for the giant with a hundred eyes who never closed all of them at once, which is a decent description of a single asyncio process running fifty independent check loops.

## The one-line contract

The whole design falls out of one decision: the output is JSON lines on stdout, and that's the entire interface. One line per check result, periodic heartbeat lines so silence is distinguishable from death, nothing else. No metrics endpoint, no exporter, no push gateway, no alerting rules, no retention policy, no storage. An OTEL collector scrapes it, Splunk ingests it, or you pipe it into `jq` while debugging, and all three work the same way because there's only one output path and it's the boring one.

That's a subtraction, not a feature. Most of what a monitoring tool normally contains is machinery for getting data somewhere else, and every organization I've worked in already had that machinery, already paid for it, already had people who understood it. Building a second one inside a health checker just means maintaining a worse version of something that already exists next to it.

## What it watches

Each target type is a plugin, chosen by a `type` field in a YAML config: public HTTP endpoints, authenticated APIs, cloud provider status feeds, Azure VNet and quota capacity, databases. Each one runs on its own interval - a status page every five minutes, a database every thirty seconds - and neither blocks the other.

A connector implements one coroutine, `async def check(self) -> CheckResult`, with one rule enforced by convention and tests: it isn't allowed to raise. Timeouts, DNS failures, transport errors, malformed responses all get caught and mapped to a `DOWN` or `ERROR` result and emitted like any other line. A health checker that can crash because the thing it's checking is broken isn't a health checker, it's a second outage - so making failure a value instead of an exception means the engine has exactly one behavior, emit a line, and no path where a bad target takes down the process watching the good ones.

Auth is deliberately explicit, too. Azure-backed checks use a named service principal wired from a Kubernetes secret rather than falling through the ambient credential chain, and the engine fails fast at startup if credentials are missing. Ambient credential resolution is great on a laptop and a source of genuinely confusing incidents in a cluster, where whatever it silently falls back to is some identity nobody remembers granting.

## Why not just use Prometheus

Fair question, and for most of this, you should. Prometheus and its ecosystem beat this at nearly everything - storage, querying, alerting, and the fact that other people already know how it works. If the problem is "collect metrics from things that expose metrics," that's solved, and I'm not solving it again.

The gap Argus sits in is narrower. Some of what I want checked doesn't expose anything to scrape: a third-party API that either answers or doesn't, a cloud status feed that's a JSON document, a quota number behind an authenticated management-API call. The blackbox exporter covers part of this, and then you're writing exporter modules - which is writing connectors, just in a repo whose actual job is something else.

The output shape differs too. Prometheus wants a time series, a number sampled over time. What I want from these checks is an event - this check, against this target, at this timestamp, with this latency, this status, this error string. That's a log line, and it belongs where logs live, next to the application logs from the same incident. Forcing it through a metrics pipeline loses the one string that tells you what actually went wrong.

So it's not a replacement, just a different shape. If you already send structured logs somewhere - and almost everyone does - this plugs into that instead of asking for a second pipeline.

## Where it stands

Prototype, honestly. It runs, the connectors work, and the test suite mocks every external call so it never needs live credentials or a network. It's packaged with `uv`, containerized, and has Kubernetes manifests - ServiceAccount, a ConfigMap for check definitions, a Deployment - sitting ready in the repo.

It hasn't been deployed to a real cluster, so it hasn't met a real week yet. The interesting failures here are all operational - config reload, credential rotation, what happens when a target hangs instead of failing, whether the heartbeat interval is right - and none of those show up until something's been running unattended longer than my patience. It lives in a `k8s-experiments` monorepo for now, which is an accurate description of where it's at.
