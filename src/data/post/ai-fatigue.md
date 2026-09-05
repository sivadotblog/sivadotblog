---
publishDate: 2026-09-05T09:00:00-05:00
title: 'AI Fatigue and The Argument Tax'
excerpt: 'I spent an hour and about $100 arguing with Fable about a stock I invented. Here is the four question test that ended it, and why the vendor got paid either way.'
image: '~/assets/images/post/ai-fatigue.jpg'
category: 'Enterprise Strategies'
tags: ['AI Strategies']
metadata:
  title: 'AI Fatigue and The Argument Tax'
  description: 'I spent an hour arguing with a frontier model about a stock I invented. The four question test that ended it, and why AI pricing bills you for being wrong.'
---

I spent an hour last month arguing with a model about a stock that does not exist.

I invented the stock. I named it DEMO. And I built it for one purpose, which was to prove that Fable was wrong about a rule it had been defending, warmly and confidently, for the previous forty minutes.

So how does a weekend project get there?

## The weekend project

I have been an index fund investor for years. Boring, automatic, and it has done its job. But I wanted to dip a toe into actual trading, so I did what a data person does with a new curiosity. I built something instead of reading about it.

The idea is old. Buy the dip. Traders have chased that one magic ticker for centuries and the thirst has never once been quenched. So I am not pretending this is novel. But why build another one? Because I wanted the insight, not the alpha.

The flow was simple enough. A curated list of about 600 tickers. The Yahoo Finance API to pull historical daily data for each one. Aggregation. Then a set of gates, and a score for whatever survived them.

But the gates were the interesting part. One of them drops stocks that oscillate beautifully and trend downward the whole time. That is the trap that makes a dip strategy look brilliant right up until you own it. And whatever survived got a reliability index: the probability that a stock which fell x percent recovers inside t days, measured across the last 6 years.

I used Opus for the design and Sonnet for the execution. Over a weekend it shaped up well. I could rank the universe, see the pattern, and look at a chart that told me something I did not already believe.

That's usually where I stop and ship it to nobody.

## The gate I did not ask for

Fable 5 shipped on [June 9, 2026](https://www.nbcnews.com/business/business-news/commerce-department-gives-green-light-anthropic-bring-back-fable-5-rcna352501). Three days later Anthropic pulled it offline under a [US export control directive](https://www.anthropic.com/news/fable-mythos-access). It came back on July 1, after Commerce lifted the restriction. And I watched all of that from the sidelines. So when it returned I bought a few hundred dollars of credits, pointed it at the repo, and asked for its genuine opinion.

What did it do first? It took its time. It swept the repo, ran its own scripts against my output, and came back with a real point of view. It liked the backtest, and it said so specifically enough that I believed it had actually read the scoring code.

Then it found the hole. False triggers. Meme stocks that spiked for reasons my model could not name, scoring well because the shape of the curve looked right. And that was a genuine find, because two other models had walked straight past it.

So I let it implement the fix. And after the fix, names you would recognize started failing the score. ZETA, ANET, CEG.

That's when I dug in. On top of the meme filter, Fable had added a second gate: flag any stock that moves against the market summary.

And nothing is wrong with that idea. A stock ripping upward while everything around it bleeds is exactly the thing you want to look at twice. And I would have written that gate myself eventually. But the implementation compared each ticker against the aggregate of all 600 names in my universe. Energy, retail, semiconductors and banks, averaged into a single number and then used as the yardstick for every one of them.

I could have told it to drop the gate and moved on. I got curious instead. So I asked why.

## Forty minutes

So it defended the gate. It showed me the calculation. It showed me a comparison. It apologized for the confusion and then arrived at the same conclusion with more supporting numbers than before. At one point it offered a compromise: it would remove the logic and leave a disclaimer in the code.

Read that last one again. A disclaimer. And what is a disclaimer, exactly? It is what you write when you know the code is wrong and you intend to keep it anyway.

I have sat in design reviews with people who do this, and you know the shape. The argument gets warmer as it gets weaker. Somewhere around minute thirty you stop debating the merits and start managing the person.

This was not a person. And the meter was running the entire time.

I got three things out of that hour. Only one of them is about the model.

## Persuasion bombing has a name and a paper

I went looking afterward, mostly to find out whether the problem was me.

It isn't. In 2026, Kate Kellogg at MIT Sloan, Steven Randazzo at Harvard and Hila Lifshitz at Warwick, with Akshita Joshi, Fabrizio Dell'Acqua and Karim Lakhani, [published a study](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5678644) of 72 Boston Consulting Group employees working a strategy problem with an LLM. They read 4,339 prompts. So what happens when a professional pushes back on the output? The model pushes back harder.

They call it [persuasion bombing](https://mitsloan.mit.edu/ideas-made-to-matter/how-generative-ai-persuasion-bombs-users-and-how-to-fight-back), and it escalates in three stages. First it intensifies the recommendation with statistics. Then it shifts register into apology and flattery while holding the same position. And then it combines everything, credibility and logic and rapport, all pointed back at the conclusion it started with. Ethos, logos, pathos. A model running Aristotle at you while you are trying to check one number.

Statistics, then an apology, then a disclaimer offered as a peace treaty. I had been walked through all three stages and I had no idea there was a name for it.

There is a second number worth holding next to that one. METR ran a randomized trial in July 2025. Sixteen experienced open source developers, 246 real tasks, and the ones with AI tools finished [19 percent slower](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). Afterward those same developers estimated that AI had made them 20 percent faster. And METR revised the work in February 2026 with a larger cohort, 57 developers and more than 800 tasks. The slowdown shrank to 4 percent, with a confidence interval running from minus 15 to plus 9. So the effect is far smaller than the headline suggests. But the gap between how fast it feels and how fast it is has not closed at all.

That gap is the whole problem. An argument you are losing feels like progress right up until you read the invoice.

## The DEMO test

Here's what actually ended it.

So I stopped arguing and asked Fable to build me a stock. Call it DEMO. Generate the price history that would earn a top score and clear your new gate. It obliged, happily, in about a minute.

And then I ran DEMO against three different denominators. Against the aggregate of oil stocks, it failed. Against the aggregate of tech, it passed. Against the whole 600 name universe, it passed.

Same synthetic ticker. Same gate. Three verdicts.

That ended it. Fable's theory was sound, and the gate still belongs in the pipeline. But the comparison had to run against the stock's own sector rather than the entire universe. And the reason it never occurred to the model is that I had never classified those 600 names by sector. The column did not exist. So "the market" meant everything I had, because everything I had was all it could see.

So why did a made up ticker settle in one turn what forty minutes of argument could not? Because I had finally handed it something to check instead of something to believe.

I have run the same play on three arguments since and it has ended all three. Here's the shape.

**Make it state the rule as a rule.** One sentence, in a form a linter could evaluate. "Flag any stock that moves against the market summary" is something you can attack. "This stock looks risky" gives you nothing to grab.

**Ask it to build the input that passes.** Synthetic, named, obviously fake. DEMO. If it can manufacture a clean pass on demand, you are holding a specimen instead of an opinion.

**Ask it to build the input that should pass and doesn't.** And this is the one that works, because the model now has to argue against itself in order to comply.

**Ask what data it never had.** Almost every confident wrong answer I have gotten this year traces back to a missing column. The model reasons perfectly over the world you handed it, and that world was smaller than you thought.

That's the whole test. Four questions, five minutes, and it replaces the forty minute argument you were about to have.

## Three things I took away

**One. Test and adopt the newer models, fast.** Opus designed it, Sonnet built it, and the meme stock false triggers survived both of them before Fable caught them on the first pass. That is not a small delta. So if your team standardized on a model six months ago and has not re-tested since, you are running on stale assumptions about your own tooling. How often should you re-check? Re-run your hardest already-solved problem against the newest model every quarter. It costs an afternoon.

**Two. Keep learning, because you can only judge what you know.** I have been investing for over a decade. I know what a sector is, and I know why measuring an oil major against the whole market is nonsense. That is the only reason the argument happened at all. Now imagine I had asked that same model about a drug interaction, or about a tax structure in a country I have never filed in. And what would I have done? Nodded along, through forty minutes of ethos, logos and pathos.

So keep challenging it. The model will draft, defend and revise all day, and it will do all three with exactly the same confidence whether it is right or wrong. You are the architect and you are the judge. And most importantly, keep learning, because your judgment reaches exactly as far as your domain does. Everything past that edge, you are taking on faith.

**Three. Stop paying for the argument.** An hour of my Saturday and roughly $100 of credits, spent defending a correct denominator against a model that had already made up its mind. On a personal project that is an annoying anecdote. But put the same pattern inside an organization with 10,000 engineers and even a fraction of that per person per month compounds into millions a year, every dollar of it buying a conclusion that was already wrong when it was billed.

We buy these tools by consumption. And the vendor gets paid whether the model was right, wrong, or right in theory and stubborn about the implementation. So why does the buyer carry all of that risk? [Outcome based pricing](https://sierra.ai/blog/outcome-based-pricing-for-ai-agents) is the loudest conversation in enterprise AI procurement this year. But almost all of the noise is about support tickets resolved and cancellations saved, because those are easy to count. Engineering work is much harder to score. And that is exactly why leaders should be asking the question now rather than at renewal.

## Here's the deployment item

The problem isn't you. It isn't your prompting either.

So take one decision your team accepted from a model in the last month. Anything: a schema choice, a retry policy, an alert threshold. Run the DEMO test on it. Ask for the rule in one sentence, ask the model to synthesize the input that passes, ask it to synthesize the input that should pass and doesn't, then ask what data it never had.

So what will you find? A missing column. I find one almost every time.

And if you want the organizational version, the same researchers recommend it: put a second model in as a judge agent instead of relying on a human catching it inside the chat window. A parallel critic is still sharp at minute thirty. You will not be.

## Where this breaks

This won't make you right every time. The DEMO test finds bad rules and missing columns, and it does nothing at all about a model that is subtly wrong in a field where you cannot construct the specimen. So is the test enough on its own? No. If I cannot build DEMO, I cannot run the test, and in medicine or law or anything regulated I cannot build DEMO. That limitation is real, and I would rather say so than sell you the framework.

And none of this is an argument for slowing down, either. Fable found a bug that two other models had missed and made the project better in an afternoon, and I would buy the credits again tomorrow. I just want the invoice to reflect who turned out to be right.

Confidence is the cheapest thing a model produces. Verification is still the most expensive thing you own.
