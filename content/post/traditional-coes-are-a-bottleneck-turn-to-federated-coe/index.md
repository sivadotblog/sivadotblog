---
title: "Traditional CoEs are a bottleneck! Turn to Federated CoE"
description: "Explore the shift from traditional Centers of Excellence (CoEs) to a Federated CoE model to overcome bottlenecks and enhance organizational agility."
summary: "Dive into the evolution from traditional CoEs to Federated CoEs, a move that promises to dismantle bottlenecks and foster a more agile, responsive organization."
date: 2022-12-15T10:00:00+02:00
lastmod: 2022-12-20T10:00:00+02:00
draft: false
weight: 50
categories: ["Enterprise Strategies"]
tags: ["CoE", "Federated CoE", "Organizational Agility"]
contributors: []
pinned: false
homepage: false
type: blog
seo:
  title: "From Bottleneck to Breakthrough: The Rise of Federated CoEs"
  description: "Unveil the transformative potential of transitioning to a Federated Center of Excellence model for overcoming traditional bottlenecks and driving organizational agility."
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---


I have been in COEs for about 14 years, and to be honest here, nobody likes working with a COE or being in a COE. I am speaking for myself too. Today we will cover a trending concept called Federated CoE.

## What is a CoE?

![Traditional CoE Structure](/images/post-photo-traditional-coes-structure.jpg)
[Center of Excellence](https://en.wikipedia.org/wiki/Center_of_excellence)is a team consisting of specialized skillset(s) in a focused technology or niche. They manage, govern, and deliver their capabilities to the enterprise. All this sounds fancy. This made sense during the 2000's and here is why:


1. COEs understand [**DRY**](https://deviq.com/principles/dont-repeat-yourself) (Don't Repeat Yourself) more than anyone. Since they share a common knowledge/code repository, they reuse every piece. Tons of saved development time.

2. DRY is even embedded in the designs created by their architects. They think DRY, breath DRY, sleep DRY. While applications teams attempt to be DRY, they often fail as they can't think beyond their application most times.

3. CoE's are efficient. CoEs ideally manage their own infrastructure and it's ready to run anytime needed. While applications need to set up their infrastructure every time a new project/ team kicks off. Compare this to buying a fully grown shrub from your local nursery vs sowing the seed, waiting for it to become a shrub.

4. COEs are cost effective. I can't stop repeating about DRY enough. That by itself is a ton of savings. However, this more to that, shared infrastructure, software licenses, developers & architects, and more importantly shared knowledge.

So, what's the problem?

## The Bottleneck Problem with COE

COEs are **limited by resources** and so they can only cater to a certain number of teams at a given time. You might wonder why not add more resources? The issue is, COEs tend to have extreme peaks and valleys. There could be times when COEs have nothing to do and just wait for work, while other times they are overloaded twice as much. So having more resources is not efficient.

The next problem with CoE is **conflicting project priorities**. COE Leaders often negotiate project priorities and timelines with multiple project owners. Nobody likes their project to take a backseat for the other. It becomes political more often than not. I and my boss use to team up to address these political concerns. She would wear the black hat( "Sorry, we dont have a resources”) , and I play the angel architect role ("dont worry, lets get it done”). Its super uncomfortable.

To be fair to the product/project teams, CoE developers are not **domain experts** in any particular subject. In most cases, domain leads need to spoon feed them, unless you have exceptionally experienced architect(s) in your CoE who understands every domain. That is still a problem when they leave the company. Coaching temporary CoE developers is not the best use of time for the domain leads either.

The other problem, important but often ignored, is **team morale**. CoEs are often not considered as "project team” but instead as "outsourced” services. We fail to give them enough credit for what they do. It's not natural for project/product leaders to appreciate or recognize an external team or team member (especially after they have negotiated project priority). I have worked in the integration space a lot and till date, very few in the organization would understand the impacts of CoE Managed Integration being down vs eCommerce going down for an hour.

Finally, with the rapid change in technology and adoption to agile, COEs don't necessarily follow that principle (I'll write another on agile COE later). Teams don't necessarily consult the CoE (some hate it actually). So, they try to solve the gap using random technology out there in the marketplace or try to circumvent the gap using other non-standard means. This is hard to govern, and the CoE loses its purpose.

## Problems with Decentralized structure

This part is easy, decentralized teams lose all the benefits of COE. And that is huge, your teams will explode with numerous technologies, numerous resources and as those resources leave, those new random fancy technologies hang without support.

That aside, my biggest opposition for decentralized development model is, **why focus on things that don't add value for your team?** Let's take the marketing team for example, why would you spend time on preparing and ingesting the data from the enterprise, scripting batch jobs instead of focusing on marketing analytics and trends?

Let me clarify this, I am not suggesting that every technology has its own CoE. Java CoE doesn't make sense, and so is Frontend CoE, its vague and impractical. But CoEs for API Platform, [Data Fabric](https://www.gartner.com/smarterwithgartner/data-fabric-architecture-is-key-to-modernizing-data-management-and-integration), [Data Analytics](https://www.gartner.com/en/topics/data-and-analytics) or RPA(robotic process automation) all make sense.

## Federated COEs

The idea behind federated COE is to maintain the benefits of a COE while offering the flexibility to project/product teams to execute their tasks without being a bottleneck.

Let's explore that in detail.

### Organization structure

![Federated](/images/post-photo-federated-coe-structure.jpg)
**Federated CoE** consists of a **platform CoE** and federated CoE members. Platform CoE will govern the platform and its capabilities while the CoE members are natural team members. They are not directed by the CoE nor will have separate leadership. They fit right into a project/product team.

While traditional CoEs carried the burden of managing resources and projects, which was the major bottleneck, this method eliminates that. Yet, they are under the purview of a CoE which governs the best practices, preserves a shared knowledge/code repo and continues to evolve its technology, people, and process.

By ‘platform', I don't mean the infrastructure alone. It's a raised bed for the technology/niche itself. Let's take this example: an organization runs an integration CoE integrating data between systems. Their platform would be including tools or technologies, its infrastructure, standards & best practices, and any guard rails that apply for the technology.

#### Responsibilities of a Platform CoE

Platform CoE will be responsible for the following

1.

1. Identifying tools and technology needed to effectively run their CoE.

1. Creating standards & best practices

1. Identifying & documenting its capabilities and patterns.

1. Managing a centralized knowledge repository.

1. Conducting periodic tech talks and initiating collaborative sessions amongst the CoE members.

1. Make the platform self-service with sufficient guard rails.

1. Consult enterprise architects and guide them to the right pattern.

1. Coach new resources and mentor them along the way.

While these are not an exhaustive list, this will act as a guide for organizations who wish to federate their CoE structure. I would recommend three guiding principles for the platform team to run at their fullest.

##### **Core Principle 1: Self Service**

Platform CoE should build features/capabilities/patterns that can be catered by itself, i.e self-services. You shouldn't be involved in provisioning an Apache Spark engine for the project team. Instead, Platform CoE should provide teams with an IaaC (Infrastructure-as-a-Code) template such as Terraform where consumers fork it, change a few variables, and deploy it.

Consider this: you have an enterprise level logging/alerting pattern for any application to notify the operations team and you want every developer to use it. There should be no manual intervention to force a developer to use this pattern. Instead, the CI/CD pipeline should fail when they don't include this function.

##### **Core Principle 2: Governance, not Control**

Steve Jobs once said

> "It doesn't make sense to hire smart people and tell them what to do; we hire smart people so they can tell us what to do.”

This core principle says exactly that. Empower your CoE members to make design decisions without having to micromanage their designs. Otherwise, it defeats the purpose of federation.

Platform CoE should never make design decisions. Thats the project team's responsibility, however you can "govern” them by saying what's right and what's wrong with the design they have chosen. This does not mean that you can't call out a wrong design. You continue to collaborate, negotiate but not control.

##### **Core Principle 3: Innovate with Purpose**

Evolve faster, but with a purpose. Platform CoEs have dedicate time for innovation, and sometimes we run into a technology rabbit hole without a purpose. What are you solving for? Can we measure the RoI? Are we replacing a depreciating technology? What do our customers want?

I recently saw a corporate IT challenge that says "Graph DB Challenge! What problem can you solve with GraphDB?”

What is the point? You just want to use GraphDb because its fancy and trending? Instead, I would approach it with, "This is my problem, how will you solve it?” If the answer is GraphDB, so be it.

## Migrating to a Federated CoE

Ok I am all sold. Now what?

Good! Let me break down the migration process. You can adjust as needed. We don't want to break the organization overnight causing chaos. Let's take our time doing it gradually.

##### Step 1: Set up the Platform CoE

Identify the core members of the Platform CoE. Generally, we want Infrastructure architects, Platform Architects (specialized in technology/niche) and a small percentage of Engineers. Identify the leadership team. Most of these resources should already exist in your traditional CoE.

##### Step 2: Build a Roadmap

Create a short term (1-2 years) and long term (3- 5 years) roadmap for your CoE. Short term road map should aim to completely federate the team and distribute the resource pool to project teams. Short term goal should also be able to deliver a MVP (minimum viable product) for centralized knowledge sharing system and CoE forum communication strategy. CoE Forum should be holistic of all CoE Members.

Long term goal should focus on innovation, technology lifecycle, knowledge repo and enhancing the process and CoE practice.

##### Step 3: Federating the team

People leaders and project managers play a key role in this step. We identify resources, their interests, and strengths. Leaders then map the resources to projects based on individual findings. Work with the project teams and transition the team members to the project team.

For some this might be a hard transition. The resources being transitioned will no longer work across domains and will have more responsibilities tailored to the domain. This is a difficult yet important transition. Leaders must show empathy, compassion and continued mentorship during and after the transition.

##### Step 4: Implement-Measure-Learn Feedback loop

If your organization is already leveraging Insights to make decisions, great! If not, you should. Insight Driven Business is no longer optional, instead it needs to be embraced by every organization and every domain to improve the process and identify waste. Thats a separate topic of its own. For our purposes, collect as much data possible from within the CoE Forum and from external teams.

Gathering data and creating reports and visualizations is no fun, however this can be in your long-term road map. But collecting raw data shouldn't be rocket science. Send out feedback forms after every Tech Talk, collect data from your agile tools (like Jira, Azure Devops) associated with the stories/ tasks delivered by your CoE developers, collect incident reports from your ITIL tools like service-now. Use these data eventually to build prescriptive and diagnostic reports.

## Conclusion

We don't have the budget, no time, critical projects and tight timelines, lack of resources and more are just excuses. Change is difficult but necessary.

Remember the hunter gatherer's story who caught fish by hand? He stood in the middle of the river stream and tried to catch fish all day. Some days he got lucky, other days he was exhausted and slept with an empty stomach. One morning, he stopped fishing and decided to make a spear. This not only made fishing easier but also gave him more time to think and invent a bow & arrow to hunt. It's the snowball effect.

It's OK to starve a project, it's OK to slow down but it's NOT OK to stop evolving.
