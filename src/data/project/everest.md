---
title: 'Everest'
tagline: 'Find the stocks worth trading twice.'
description: 'Ranks stocks by how often they complete a full dip-and-recover cycle, to find names that give repeatable setups instead of one-off moves.'
image: '~/assets/images/project/everest.jpg'
status: 'live'
date: 2026-07-31
tech: ['Python', 'yfinance', 'Plotly', 'MkDocs', 'LangChain']
links:
  - label: 'Source'
    url: 'https://github.com/sivadotblog/stock-threshold-analyzer'
    primary: true
  - label: 'Leaderboard'
    url: 'https://sivadotblog.github.io/stock-threshold-analyzer/'
---

Most screeners are built to answer whether a stock is going up. I have no edge on that question. And I am not convinced the tools claiming one do either.

So I went looking for a question the data can actually answer. How often has this name handed me the same setup, and how steady has that cadence been? A stock that falls 10%, recovers, falls again and recovers again, eight times a year, is offering something a momentum screener never ranks. Rhythm is a measurement. A target price is a forecast.

The name is the mechanic. An Everest climb is a set of rotations rather than one push: up to Camp I and back down to Base, up to Camp II and back down again, for weeks. The descents are the reason the body adapts, and the camp you return from sits a little higher each time. And that is the shape the screener is hunting for.

The rule is mechanical. There is no model anywhere in it.

1. Take the first close in the window. Call it the anchor.
2. Walk forward one day at a time.
3. The moment a close sits +N% or -N% from the anchor, log an event and move the anchor to that close.
4. Repeat to the end of the window.

Each completed upward move is a leg. And names rank by legs per year, filtered to the ones that finished the window higher than they started. A stock racking up cycles on the way down is a falling knife with good rhythm.

The moving anchor is the trick. A fixed reference measures distance from one moment in history. An anchor that walks measures the cadence of the thing itself.

Here is what it refuses to do. The signal is stateless. Last leg down prints `BUY`, last leg up prints `SELL`, and the tool has no idea what you hold or what you paid. Sizing, stops and exposure limits belong to a person holding information the screener will never see. N stays at 10% by choice, because sweeping it to maximize cycle count is fitting noise and calling it a result. Storage is a JSON file, prices come from `yfinance` adjusted and cached to disk, and the frontend is a static site that reads the leaderboard. So nothing runs unless I run it.

So what does a place on the leaderboard actually tell you? Eleven cycles over three years is a measurement. A twelfth is a guess. I keep that distinction loud in the output, because the failure mode of a ranked list is that the ranking starts to feel like a recommendation. A name stops oscillating the day its volatility regime changes, and the screener has no visibility into an acquisition, a guidance reset, or a shift in who is holding it.

Next is an agent that runs the screen, backtests the survivors to throw out the one-off earnings gaps, and writes up what is left as a report the frontend already renders. The judgment layer goes on top. The screener stays exactly as dumb as it is.
