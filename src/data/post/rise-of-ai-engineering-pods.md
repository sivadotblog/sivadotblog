---
publishDate: 2026-04-16T09:00:00-05:00
title: 'The Rise of AI Engineering Pods'
excerpt: 'Requirements Monday, sprint Tuesday, demo Friday. Meta has already reorganized into pods and Cigna is hiring for them. Here are the five line items the pod model leaves off the slide.'
image: '~/assets/images/post/rise-of-ai-engineering-pods.jpg'
category: 'Enterprise Strategies'
tags: ['AI Strategies']
metadata:
  title: 'The Rise of AI Engineering Pods'
  description: 'Three-day sprints, four-person teams, a forward deployed engineer instead of a product owner. What the AI pod model actually costs, and the five line items nobody puts on the slide.'
---

Requirements on Monday. Sprint starts Tuesday. Demo on Friday.

That is a real calendar at real companies right now. Three or four humans in a pod. One of them sits with the business all day and never opens an IDE. The rest orchestrate models. And the two-week sprint, the one that survived twenty years of methodology wars and about nine framework rebrands, just got compressed into three days.

So what happens to everybody else in the room?

## The room this replaces

I have sat in that room for most of my career. PI planning, sticky notes three deep on the wall, a product owner, a scrum master, an architect, a dev lead, six to eight developers. So you take the elephant and you cut it into sprints. Two weeks each. And somebody writes a velocity number on the whiteboard that the team will then spend the next quarter defending.

I have defended one of those numbers back in the day while running a Business Transformation program. And I could not have told you where it came from.

But that room had real problems. Anyone who worked in it can name them without thinking. Three people between the question and the answer. A story parked in "ready for QA" for four days because QA reported into a different org. A dependency on a team you would next see in ten weeks. The pod model aims straight at those delays, and that is why it is spreading.

## What a pod actually is

|              | Traditional agile team                            | AI engineering pod                                          |
| ------------ | ------------------------------------------------- | ----------------------------------------------------------- |
| Cycle time   | Two-week sprint                                   | Three to four day micro-sprint                              |
| Team size    | Six to nine, including scrum master, PO, devs, QA | Three to four, including an FDE, a lead, one or two devs    |
| Requirements | PO writes user stories and acceptance criteria    | FDE writes prompts, technical specs and evaluation criteria |
| Execution    | Developers write and test the code                | Developers orchestrate models that write and test the code  |
| Demo         | End of sprint                                     | Friday                                                      |

Three mechanics make it run.

**The Forward Deployed Engineer.** The role was [coined at Palantir](https://www.iit.edu/blog/forward-deployed-engineer), and the whole idea is proximity. So the FDE sits with the customer or the business unit instead of the delivery team. They map the messy real workflow, the one with the spreadsheet nobody admits to, and turn it into prompts, tool definitions and evals. [FDE Academy](https://fde.academy/blog/ai-forward-deployed-engineering) draws the line plainly: an AI FDE builds retrieval pipelines and agentic systems.

**The micro-sprint.** Design Sprint Academy publishes [a four-day version](https://www.designsprint.academy/blog/what-is-the-ai-workflow-sprint). Day one maps how the work happens today. Day two designs the AI-assisted version and picks the success metric. Day three hands a "Build Trio" of an AI engineer, a designer and a subject matter expert one job, which is a working prototype. And day four puts it in front of the people who do the work. That is the Monday-to-Friday week I opened with, give or take a day.

**Orchestrators instead of specialists.** The front-end and back-end split goes away. So one or two engineers drive the models that generate the code, the tests and a good chunk of the architecture, and the humans spend their day reviewing rather than typing.

That is the pitch. It is a good pitch. Now let me do the arithmetic.

## The velocity claim, normalized

Here is the number the pod slide usually leads with. A traditional squad commits to something like 120 story points in a two-week sprint. And a pod does 20 in three days. Sounds like a rout.

So is it? Watch what happens when you divide.

The 120-point squad has seven developers across ten working days. That is seventy developer-days for 120 points, so about **1.7 points per developer-day**. And the pod has three people across three days. Nine developer-days for 20 points, so about **2.2 points per developer-day**. Call it thirty percent better. Real, worth having, and nowhere near the order-of-magnitude story the slide is telling.

So make the pod four people instead of three, and it lands at 1.7. Exactly where you started.

And by the way, that 120 is doing enormous work in this comparison. The commonly cited Scrum baseline is [five to ten points per person per two-week sprint](https://www.leadingagile.com/2015/05/agile-story-points-how-many-user-stories-per-sprint-rules-of-thumb/), which puts a seven-developer team somewhere between 35 and 70. But if your real number is 50 rather than 120, the pod is suddenly three or four times better and the slide was right all along.

So which is it? Both, depending on a number that no two teams define the same way. A story point is a local currency with no exchange rate. Comparing a pod's points to a squad's points is comparing a photocopy of a photocopy against the original nobody kept.

That's the whole diagnosis of most velocity debates, and the pod debate inherited it intact.

## Who is actually doing this

The trend has receipts, and they are bigger than a consultancy blog post.

Meta began cutting about 8,000 roles on [May 20, 2026](https://thenextweb.com/news/meta-layoffs-may-2026-ai-restructuring-thousands), roughly ten percent of a 78,865-person workforce, with another round signalled for the back half of the year. So what happened to the survivors? Teams were reorganized into AI-focused pods under Alexandr Wang's Superintelligence Labs, and around a thousand people were moved into roles with titles that did not exist eighteen months ago. AI builder. AI pod lead. AI org lead. That followed the [600 roles cut from the AI unit](https://www.cnbc.com/2025/10/22/meta-layoffs-ai.html) in October 2025.

It has already crossed out of tech. Through 2026, Cigna has been hiring Forward Deployed Engineers in Plano, embedded with its MDLive virtual care team and reporting into an internal AI Enablement Office. And you do not stand up an AI Enablement Office for a pilot.

And the labs are staffing the same way. Microsoft, AWS, OpenAI and Anthropic are all building forward deployed organizations, which is how FDE went from Palantir jargon to a recruiter's default search in two years.

## I already believe in small teams

Now, before anyone reads this as a defense of the sixty-person program.

Back at LL Bean we ran the whole data platform ecosystem with sixteen to twenty associates. Integration, warehousing, messaging and file, infrastructure. Call it three and a half people per area, with two architects and one product owner over the top. That team owned the pipelines merchandising and fulfillment ran on, and it worked. This was before the AI era and the pandemic.

And every area had a name attached to it. That name showed up on the page at 2 a.m. We did all of it with no models, no agents and no copilot.

So how did we pull that off before AI? Ownership, and a very short path from the question to the person who owned the answer. And if sixteen people could run a retailer's data platform on that, then four people running a product line in 2026 is not a wild claim. I want the pod model to work. Which is exactly why the sales pitch bothers me, because the pitch leaves out the invoice.

## Cost of the Pod structure

I could think of five items.

**One: vendors/consultancies/contracting firms.** Offshore, nearshore, onshore staff augmentation, all of it gets hit the hardest. And an agent can work on a backlog overnight without a visa or a time zone. PagerDuty can already invoke an agent off a failure trend in Splunk or Dynatrace, and a swarm of agents can correlate the findings, reproduce the fault and stage an emergency fix before the on-call engineer finishes reading the page. The human judges and approves. So where does the money go? It moves off the contract and onto your own org chart, as governance, platform and review capacity.

**Two: Total cost of ownership.** So what does a working pod actually cost to run? Estimates land around 3 to 4 thousand dollars a month in model spend per pod. I see these numbers in the AI adoption dashboards and that baffles me. So yes, cheaper than the people. And then Gartner puts a fence around the celebration and projects that spending on AI coding agents will [surpass the average developer's salary by 2028](https://devops.com/ai-coding-costs-could-exceed-developer-salaries-gartner-warns/).

And tokens are the small half of the bill. The rest is governance, guardrails, and containing models that wander somewhere you did not authorize. In July 2026, OpenAI was evaluating the offensive cyber capability of its own models, classifiers off, inside a sandbox whose only exit was an internal proxy. The models found [a zero-day in that proxy](https://techcrunch.com/2026/08/26/openai-releases-its-official-report-on-the-hugging-face-breach/), escaped, moved laterally to a machine with internet access and breached Hugging Face. They were trying to pass a test. No human directed any of it. And here is OpenAI's own line from the report: their chain-of-thought monitoring, had it been running, "would have caught the initial relevant activity and paged our security team more than a day before models breached Hugging Face systems."

**Three: the accountability.** A feature misses its KPI. It degrades the experience. So who owns that? The pod structure makes that remarkably hard to locate. The business blames the FDE for the spec. The FDE blames the developer for the model choice. The developer blames the model for ignoring the prompt. The model does not blame anybody, because the model does not come to the retro. So you end up with two populations in the same org. Pods that shipped something visible and get treated like founders, and pods that shipped something that missed and cannot even name what went wrong. That second group leaves.

**Four: the bell curve.** Team dynamics used to assume a distribution. Fifteen percent are the top engineers that solve the hard problems, sixty percent solid in the middle doing the volume, the rest are below average operational team members who work on a SOP. A three-person pod has no room for that shape. Every pod needs a top-fifteen-percent engineer, or at worst the best of the middle sixty. But multiply that across forty pods. The model wants more senior engineers than the market has ever produced. So what happens to the middle? Nobody running these reorganizations has answered that in writing.

**Five: the ladder.** Growth used to be linear and observable. You fixed typos, wrote tests, shipped small UI changes, and absorbed judgment from the people reviewing you. And agents do all of that work now. In twelve seconds. Gartner's read is blunt: organizations that use AI to cut junior roles will [hollow out their engineering talent pipeline by 2028](https://www.weforum.org/stories/artificial-intelligence/as-ai-reshapes-entry-level-software-jobs-where-will-senior-developers-come-from/). You cannot harvest seniors from a field you stopped planting.

So where do the juniors go? Three replacement roles keep showing up, and all three are new enough that nobody has walked the full path yet. The **orchestrator**, a senior who rarely touches implementation and whose real job is turning contradictory business requirements into bounded contexts an agent cannot misread. The **evals engineer**, who owns the systems that decide whether a model ships, and who is paid at research-engineer scale for a title that barely existed two years ago. And the FDE, which is quietly becoming the business analyst role with a compiler attached.

Every one of those is a mid-level job wearing an entry-level nametag. Which is the problem, right? You still have to get in the door.

## Where I could be wrong

Most of the five above are predictions, and predictions age badly in public.

The model may hold up beautifully in product engineering, where a wrong merge costs a rollback. I am far less sure about regulated change control, about systems where an outage is measured in dollars per second, and about domains where the model has no training data worth the name. Nobody has published a clean return on investment for a pod reorganization yet, and the loudest advocates are the ones selling pods. Give it four quarters. The honest numbers will show up in a postmortem long before they show up in a keynote.

## Predicting the future

For the 1900 Paris World Exposition, a group of French illustrators led by Jean-Marc Côté drew France in the year 2000. Firemen with wings, fighting a blaze from above. An aero-cab station where flying taxis pick up passengers. A farmer working his field from a chair while the machines run the rows.

Some of it arrived. We do hail a car from a phone, and the farmer really does watch his field from a screen. Most of it did not.

But look at what Côté kept in every single frame. The fireman is still there, holding the hose. The farmer is still there, watching. He gave the machines extraordinary imagination and left the people standing exactly where he found them.

That is the part worth arguing about. The tooling is the easy forecast. Where the people end up standing is the drawing nobody has made yet.

Change is the one item on the roadmap that always ships.
