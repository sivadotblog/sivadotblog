---
title: 'Stock Threshold Analyzer'
description: 'Oscillation analytics on a moving-anchor ±N% rule, built for dip-cycle compounding on stocks that swing a lot while trending up.'
status: 'live'
date: 2026-07-31
link: 'https://github.com/sivadotblog/stock-threshold-analyzer'
---

## High-level summary

Stock Threshold Analyzer screens stocks for one specific pattern: names that oscillate a lot while still net-trending up. It's built around a single mechanical rule — a **moving-anchor ±N% threshold** — rather than predictive modeling.

Start at the first close as the anchor. Walk forward day by day. Each time the close moves ≥+N% or ≤−N% from the current anchor, log an event and reset the anchor to that new close. Each completed +10% leg is one realized, harvestable recovery — the ranking metric is simply `up_legs_per_year`, filtered to names with a positive net trend over the lookback window.

## Design

- **Data**: [`yfinance`](https://github.com/ranaroussi/yfinance) daily OHLCV, split- and dividend-adjusted, cached locally.
- **Engine**: a Python pipeline (`analyze` / `leaderboard` commands) that walks the anchor rule over each ticker, computes `up_legs_per_year`, `cagr_pct`, and `max_drawdown_pct`, and filters out downtrenders.
- **Signal**: stateless — `BUY` if the last leg was −10%, `SELL` if it was +10%. No position tracking; acting on the signal is left to the investor.
- **Frontend**: a static GitHub Pages site (MkDocs + Plotly) that reads the leaderboard JSON and renders a sortable table plus per-ticker charts, deep-linked to TradingView.
- **Current direction**: extending the pipeline into an agentic research tool — a LangChain + Claude agent that takes a natural-language query, screens candidates, backtests them with `Backtesting.py` to weed out false positives, and writes a structured report the same frontend can render.

**Live site:** [sivadotblog.github.io/stock-threshold-analyzer](https://sivadotblog.github.io/stock-threshold-analyzer/)
