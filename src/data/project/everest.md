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

Most screeners try to answer "will this go up?" I have no edge on that question, and I'm not convinced the tools claiming to do either.

So I went looking for a question I could actually answer with data. Not where is this going - that's a forecast - but how often has this name given me a setup, and how dependable is that cadence. A stock that drops 10%, recovers 10%, drops again, recovers again, eight times a year is offering something a momentum screener doesn't rank, because it isn't a thesis about the company, it's a measurement of rhythm.

Everest is a trading screener, not a portfolio tool. It's looking for names that repeat, not names to hold.

The name is the mechanic. Nobody summits Everest in one push - you climb to Camp I, descend to Base, climb to Camp II, descend again, for weeks. The descents aren't setbacks, they're the reason the body adapts, and each rotation the camp you return from sits a little higher than the last. A moving anchor with oscillation as the engine - that's exactly what this measures.

## The rule

One mechanical rule, no model:

1. Take the first close in the window. Call it the **anchor**.
2. Walk forward one day at a time.
3. The moment a close is **≥ +N%** or **≤ −N%** away from the anchor, log an event and move the anchor to that close.
4. Repeat to the end of the window.

Each completed upward move is a **leg** - one full cycle, start to finish. The ranking metric is legs per year, filtered to names that finished the window higher than they started.

No indicators, no smoothing, no fitted parameters beyond N.

## Walking the anchor

Round numbers, N = 10%, so the mechanism is visible:

| Day | Close | Anchor | Distance | Event                             |
| --- | ----- | ------ | -------- | --------------------------------- |
| 1   | 100   | 100    | -        | anchor set                        |
| 14  | 89    | 100    | −11%     | **down leg** → anchor moves to 89 |
| 31  | 98    | 89     | +10.1%   | **up leg** → anchor moves to 98   |
| 52  | 87    | 98     | −11.2%   | **down leg** → anchor moves to 87 |
| 70  | 96    | 87     | +10.3%   | **up leg** → anchor moves to 96   |

Two complete cycles in seventy days, and the stock is actually down four points across the window. I'm showing this example on purpose: the cycles were real and countable even though the net move was negative, which is exactly why the net-trend filter exists - a name racking up cycles on the way down isn't a setup, it's a falling knife with good rhythm.

The anchor moving is what makes this different from a fixed threshold. A fixed reference measures distance from a moment in history; a moving anchor measures the cadence of the thing, independent of where it started.

## What "reliable" does and doesn't mean here

This is worth being precise about, because it's where a tool like this can quietly mislead its own author.

What the data supports: this name completed eleven full cycles over the last three years, its average cycle took 34 days, and its worst drawdown inside a cycle was 18%. Those are measurements - checkable, reproducible, and they tell you something a price chart alone doesn't.

What the data doesn't support is that a twelfth cycle is coming. Cadence describes the past, and a name can stop oscillating the moment its volatility regime changes - an acquisition, a guidance reset, a shift in who's holding it - and the screener has no visibility into any of that. It counts what happened, it doesn't forecast what's next, and every number on the leaderboard is a historical frequency wearing the costume of a prediction. I keep that distinction loud in the output, because the failure mode of a ranked list is that the ranking starts to feel like a recommendation. It isn't. It's a shortlist of names that have been worth watching, handed to a person who still has to do the work.

## What it deliberately doesn't do

The temptation with a tool like this is to keep adding. Here's what I turned down.

It doesn't track positions - the signal is stateless, last leg down it prints `BUY`, last leg up it prints `SELL`, and it has no idea what you hold, what you paid, or what size you're at. The moment a screener tracks positions it becomes a portfolio system, and portfolio systems have to be right about things I don't want to be responsible for being right about.

It doesn't size, stop, or manage risk. No position sizing, no stop placement, no exposure limits - those decisions actually determine whether a trading approach survives, and they belong to a person with information the screener doesn't have.

It doesn't optimize N. You could sweep N across a grid, pick whatever maximizes cycle count, and publish that, but you'd just be fitting noise, and the result would be worse than the number you guessed. N = 10% is a choice, not a result.

And it doesn't have a database. Prices come from `yfinance`, split- and dividend-adjusted, cached to disk; the leaderboard is a JSON file; the frontend is a static site that reads it. Nothing runs unless I run it, so nothing costs money or breaks quietly while I'm not looking.

## Where it's going

The obvious weakness is false positives - a name can rack up cycles from one earnings gap and a dead-cat bounce, and the leaderboard can't tell that apart from genuine, repeated oscillation. Right now that's caught by eye, on the charts.

The current direction closes that loop: an agent that takes a plain-language brief, runs the screen, backtests the survivors to throw out the accidents, and writes up what's left as a structured report the frontend already renders. The screener stays exactly as dumb as it is - the judgment layer goes on top of it, not inside it.

There's a second thing I want and haven't built: cycle stability over time. Legs-per-year averaged across three years hides whether a name is oscillating more or less than it used to, and a decaying cadence versus a steady one can produce an identical average while being nothing like the same setup.
