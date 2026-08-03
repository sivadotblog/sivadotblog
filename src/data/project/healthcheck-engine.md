---
title: 'Healthcheck Engine'
description: 'A single long-running asyncio process that polls pluggable health checks and streams structured JSON lines to stdout for OTEL/Splunk to pick up.'
image: '~/assets/images/project/healthcheck-engine.jpg'
status: 'prototype'
date: 2026-07-29
link: 'https://github.com/sivadotblog/k8s-experiments/tree/main/healthcheck-engine'
---

## High-level summary

Healthcheck Engine is a continuous health-check runner: one asyncio process that polls a configurable set of targets — public HTTP endpoints, authenticated APIs, cloud status feeds, Azure VNet/quota capacity, databases — each on its own interval, and emits one structured JSON line per check result plus periodic heartbeats. The design goal is deliberately narrow: no metrics/export pipeline to maintain, because the JSON-lines-to-stdout contract is the whole point — it's built to be scraped by an OTEL collector or forwarded straight into Splunk.

## Design

- **Connector model**: each target type is a plugin selected by `type` in a YAML config. A connector implements a single `async def check(self) -> CheckResult` coroutine that is contractually not allowed to raise — expected failure modes (timeouts, transport errors) are caught and mapped to `DOWN`/`ERROR` results instead of propagating.
- **Auth**: Azure-backed checks use explicit service-principal authentication (`ClientSecretCredential`) rather than `DefaultAzureCredential`, wired from a Kubernetes Secret; the engine fails fast at startup if the SPN environment variables are missing. A check can override this with a distinct SPN via an optional `vault_path`.
- **Packaging**: `uv` for dependency management, a Dockerfile for the container image, and Kubernetes manifests (`deploy/`) — ServiceAccount, ConfigMap for `checks.yaml`, and Deployment — for running it in-cluster.
- **Testing**: connectors are tested with mocked external calls (`respx` for HTTP) so the suite never depends on live credentials or network access.

Currently a prototype in the `k8s-experiments` monorepo — not yet deployed to a real cluster.
