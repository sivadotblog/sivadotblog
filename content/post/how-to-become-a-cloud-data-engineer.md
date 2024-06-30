---
title: "How to become a Cloud Data Engineer?"
description: "Here’s a step-by-step guide, filled with a healthy dose of sarcasm and a pinch of merciless humor"
summary: "You can use blog posts for announcing product updates and features."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: false
weight: 50
categories: ["Data Platforms"]
tags: []
contributors: []
pinned: false
homepage: false
type: blog
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

Before I go too deep into this topic, let me share a little bit about myself. I am a Enterprise Cloud Architect for Data Platforms with over 14 years of experience in data engineering. Early in my career, I was an ETL Developer, but quickly became fascinated with data engineering. My cloud journey started with Google Cloud Platform in 2017 and there was no turning back since. So let me be blunt, if you are an UX UI developer or a system/database administrator or an application developer and want to become a data engineer in a brief period say 100 days, aint gonna happen! This post is specifically for folks who have exposure to Data/ETL/ELT/ESB platforms on legacy applications and are eager to move to cloud. I see many candidates clearing a bunch of cloud certifications and call themselves data engineers. However, data is one of the most complex pieces of any organization. Let’s say you are parsing a STRING “Hello World!” There are many questions you need to answer to parse the string correctly.

1. Is it in EBCIDIC, ASCII or UNICODE format?
2. If it’s Unicode, what type of Unicode is it, UTF-8?
3. Is it big-endian or little-endian format?
4. Where is the string source from? DOS or UNIX System or MAINFRAME?
5. If it’s source from a file, what is it’s RFC standard?

Most important thing is that you should know to ask these questions. These are not taught to you in any data engineering course. We learn it from experience and even then, many seasoned data engineers are not exposed to such complex scenarios. I am not discouraging folks with non-data engineering background from becoming a cloud data engineer, instead you might need more than 100 days, maybe a few years to get there. With that context let’s jump right in. Before we talk about Cloud Data Engineering, lets understand Cloud Architecture. ## Cloud Architecture

Cloud architecture is one of those buzz words we often hear these days. Cloud architect is really a systems architect who identifies the right infrastructure for an application. But the difference ends there, imagine owning a car vs riding on an uber? You put the capital on that car, pay the loan over the years, pay for maintenance, store it in a garage and so on. On the other hand, you click a few buttons and boom you have a car waiting for you. You don’t own a car or pay for its maintenance. Uber is not cheap, it’s more expensive than owning a car eventually. And so is Cloud! If that’s the case, why do companies move to the cloud? Just like Uber, cloud provides some unique opportunity - To use resources only when needed.
- To save cost and time on maintenance. (Why should a retailer maintain a data center when they can focus on selling goods?)
- Leverage technology solutions that are already built. (Why reinvent the wheel?)
- Operational cost. (Save on taxes from Uncle Sam)

Perhaps, that’s a separate topic on its own, we shall focus on data engineering for now. IBM was a leader in data engineering (they are still a leader per Gartner, but I don’t believe in IBM anymore). They offered some powerful tools like IBM MQ, IBM Integration Bus, (IIB), IBM Information Server and more that can process massive data volumes. As data got complex, there was a need for more robust technologies that adapt to changing times. A centralized team building ETL, ELT or Message Integration flows will become a bottleneck for organizations. Not to mention the fact that IBM and similar companies failed to innovate in the changing landscape. ## Why Cloud Data Engineering?

Let’s start with the why. The need for processing data on the cloud became a crucial part of business units because the scale of data needs to be stored and analyzed. The growth of Internet users from 1991 (2.8 Million) to 2019 ( 3.7 Trillion) has contributed to this significant rise in data volumes. Cloud platforms can provide a near infinite storage, something that even large organizations cannot afford. Compare it to renting a storage unit for $100 per month vs buying land, building a storage unit, and securing it for $300,000. Another reason is data landscape is even more complex. Data is no longer just csv files, relation databases and queues. So how do you move to cloud? Cloud is a mindset shift. ## What is Cloud Data Engineering?

Often, we see role conflicts especially in the data space, analyst vs architect vs data scientists. Let’s clear that up. Some of the most common roles and responsibilities of a data engineer include: - Developing, constructing data lakes, databases, and data structures.
- Aligning the data architecture with business requirements.
- Developing processes for Data ingestion (ELT).
- Testing, and maintaining the data.
- Identifying ways to improve data reliability, efficiency, and quality.
- Troubleshoot business questions.
- Deploying sophisticated analytics programs, machine learning based on statistical methods identified by your data scientists.
- Preparing data for predictive and prescriptive modeling.
- Using data to discover tasks that can be automated.

## How to navigate to Cloud?

Organizations no longer stick to a single cloud provider. Is your organization stuck with a single cloud platform? If yes, it’s a poor strategy. Topic for another day. Here is how your roadmap to cloud data engineering should look like ### **Prerequisites**

- ETL/ELT experience with at least one ETL tool like Informatica, Talend etc.
- Programming Experience with at least one language. Python preferrable
- Orchestration Tool – You might know this as a scheduler like ControlM or ActiveBatch.
- Storage Solution

### **Step 1: Time Required – 1 Day**

Choose one among the top 3 cloud providers Azure, GCP or AWS (my least favorite). All the 3 cloud provides have free fundamentals class that not only covers their respective cloud services but also cloud in general. Research what your organization uses or moving towards. If you have plans to move soon, research what your potential employer uses. An example, if you are in retail then be aware that many retailers (not all) tend to avoid AWS ( you probably know why!). ### **Step 2: Time Required <1 day**

Sign up for their public cloud platform. You are not going to pay anything yet, so don’t worry much about giving your credit card number. These are the links for Azure and GCP. - [Create Your Azure Free Account Today | Microsoft Azure](https://azure.microsoft.com/en-us/free/cloud-services/search/)
- [Free Trial and Free Tier | Google Cloud](https://cloud.google.com/free)

As you do it, bookmark these links. These are “always free” services that you run on the cloud. If you don’t want to burn your pocket, refer to the free-tier before creating resources. More on that later. - [Free Services | Microsoft Azure](https://azure.microsoft.com/en-us/pricing/free-services/)
- [Google Cloud Free Program](https://cloud.google.com/free/docs/gcp-free-tier)

### **Step 3: Time Required 2-3 weeks**

Start with the fundamentals class. I know you are in a rush; I can feel your adrenaline to pace directly to data engineering but be patient. Cloud is more than what you think you can handle. Understanding the fundamentals is necessary before you can dive deep. I wouldn’t recommend any additional courses other that what Microsoft and GCP Offers. #### Azure Fundamentals

1. [Azure Fundamentals](https://docs.microsoft.com/en-us/learn/browse/?wt.mc_id=esi_lxp_webpage_wwl&terms=fundamentals)
2. [Azure Data Fundamentals ](https://docs.microsoft.com/en-us/learn/browse/?wt.mc_id=esi_lxp_webpage_wwl&terms=data{45c6ef74749a2e512d72fb52e7e4ba63793f995ae33bc3a2d83fddf6b98ad212}20fundamentals)

#### GCP Fundamentals

1. [Google Cloud Computing Foundations: Cloud Computing Fundamentals](https://google.qwiklabs.com/course_templates/153)
2. [Google Cloud Computing Foundations: Infrastructure in Google Cloud](https://google.qwiklabs.com/course_templates/154)
3. [Google Cloud Computing Foundations: Networking and Security in Google Cloud](https://google.qwiklabs.com/course_templates/155)
4. [Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud](https://google.qwiklabs.com/course_templates/156)

### **Step 4: Time Required 1 day**

By the time you move to step 4, you have a baseline, some basic hands-on on the GCP or Azure portal. You are now familiar with some terminologies like google storage bucket, Azure Blob Storage. In this step we will laser focus on ETL/ELT Tools. To be more specific you need to identify 4 tools and get yourself well acquainted with those tools. This will be your everything for your path to Cloud Data Engineering. 1. Batch Processing
2. Event Processing (Streaming)
3. Data Engineering Platform
4. Orchestration

Fair warning – dont get carried away with terms like Kubernetes, containers, Virtual Networks, Dev-ops etc. They have nothing to do with data engineering. While those are buzz words, don’t fall for it. They come under cloud infrastructure engineering. Here is some guidance though #### Azure Data Engineering Stack

![Azure Data Engineering Stack](https://sivastech42fp1.blob.core.windows.net/images/Data-Engineering-Azure.jpg)- Batch/Streaming ELT/ETL – Azure Data Factory
- Streaming Broker – Event Hub
- Orchestration – ADF for general Pipelines, Synapse for Analytics
- Data Engineering Platform- Azure Synapse Analytics, Azure Databricks, HD Insights.
- Storage – Azure Data Lake Storage, Azure SQL Server

#### GCP Data Engineering Stack

![GCP Data Engineering Stack](https://sivastech42fp1.blob.core.windows.net/images/Data-Enginnering-GCP.jpg)- Batch ELT Data FLow (Managed Apache Beam)
- Streaming ELT – Google Pub/Sub + Data Flow
- Orchestration – Cloud Composer (Managed Apache Airflow)
- Data Engineering – Data Flow, Data Prep, Data Proc, Data Fusion, Databricks (just stick with a couple)

### Step 5: More Learning 8 – 10 weeks.

It’s time to get your hands dirty. You now know cloud basics, have decided the tools and have a feel of what Cloud Data Engineering looks like. Learn and play with these tools till you are comfortable. To be more specific, think of a data engineering project, and implement it end to end. Be creative with your ideas, one example is, get all the flight and airport data from online datasets and loading into your bigdata platform. Here is the source data for [Flights and Airports from Kaggle](https://www.kaggle.com/tylerx/flights-and-airports-data). Its time to refer to the free-tier in step one. You can create certain resources for free. If you carefully choose and plan what you are doing you will hardly get billed. I get a bill of about $10-20 some training weeks might end up with $90. You might wonder what the best way is to learn, should I take any course in coursera, or pluralsights? I can tell you this much, it depends. I find it extremely hard to learn from videos, I prefer to read from the original cloud provider documents. But that’s me, I read books and am used to it. Microsoft Learn and Google Qwiklabs are valuable resources. Please refrain from YouTube videos unless they’re from the original Cloud Provider like Microsoft or Google. While many of those videos are attractive and useful, each of those youtubers has their own style and choices of tools that won’t resonate with what you have decided. Some of them are affiliated and so, they might have a biased opinion. You are not ready to think on your own yet, you are still in infancy with cloud. So better learn from the cloud providers. Here are some learning materials for Azure and GCP #### Courses for Data Engineering

- [Microsoft Learning Path for Data Engineer](https://docs.microsoft.com/en-us/learn/browse/?roles=data-engineer)
- [GCP Learning Path for Data Engineer](https://cloud.google.com/training/data-engineering-and-analytics#data-engineer-learning-path)

### Step 6: Keeping up

Cloud technologies are changing rapidly. We get to hear new buzz words every day. So how do you keep up with that? Social media is a great place but not so great. I have tried to restrict my social media feed to my liking and so far, LinkedIn and twitter has failed me. But I have some tips. Cloud provides deploy influencers to share their products, its features and also keep their followers up to date on those areas they cover. Google calls them “Google Developer Advocates” and Microsoft calls them ” Microsoft MVP (Microsoft most valuable professional)”. They often share good, authentic content. So, feel free to follow them on twitter. Keep in mind that they are biased with certain products and specific cloud offerings. You should make the judgement call for your design/architecture. For starters you can follow - [Google Cloud Tech (@GoogleCloudTech) / Twitter](https://twitter.com/GoogleCloudTech) for how-tos, demos, product news, and more.
- [Priyanka Vergadia (@pvergadia) / Twitter](https://twitter.com/pvergadia) – GCP Developer Advocate
- [Microsoft Azure (@Azure) / Twitter](https://twitter.com/Azure) – Official Microsoft Azure Account
- [Andrea Benedetti (@anBenedetti) / Twitter](https://twitter.com/anBenedetti) – Azure Data Specialist
- [Siva Rajadurai (@sivadotblog) / Twitter](https://twitter.com/sivadotblog) – Thats me, I tweet about data engineering and automation!

## Some additional thoughts

As I mentioned earlier, cloud is a mindset shift. In your traditional ETL practice, you were focused on data structures, data formats source and target systems such as SAP, Oracle, DB2Z etc. In Cloud ETL you will additionally focus on “services” and “cost”. Services – These are cloud native applications your ETL integrations will interact with. These range from Cloud Storage, Pub/Sub, Streaming Events, Cloud Tables etc. Cost – Remember the analogy of renting an uber? Traditionally you would be paying a premium for the license and install those on your company’s data center. Well now, you pay for the software, CPU, storage, backup, and DR features. What does that mean to you? You think about cost during development. - - - - - -

Let me walk you through an analogy – You have an on-perm Oracle OLTP database. There is an existing nightly batch process (probably some ETL job) that replicates the entire DB, syncs up EDW for metrics and reports. Imagine, OLTP system stays on-perm and EDW is moving to Google Big Query. How would you design it? You should stream Oracle CDC changes into Google Pub/Sub in real time and land those into a Datalake using Data Flow, eventually using Databricks to cleanse and model the data into Google Bigquery. Replicating the whole DB is no longer an option unless you want to bankrupt your organization. Azure and GCP has good price estimation tools. Make them your friend. - - - - - -

Lastly, it’s not fair if we don’t talk about open source. So, if you were to do data engineering with open source here is how it would look like. ![Open Source Data Engineering Stack](https://sivastech42fp1.blob.core.windows.net/images/Data-Enginnering-GCP.jpg) While it’s good to know about this architecture, open source is not for everyone. It’s for companies whose core products are tech. Go back to “why” orgs are leveraging cloud? to reduce administration hurdles. Open source does the exact opposite, it adds a lot of administration overhead. The balanced act is finding a managed open source like Google Dataflow which is a managed Apache Beam or Databricks which is a managed Apache spark environment. Most companies that go for hybrid cloud seek such managed open-source products to avoid vendor lock-in. I am torn by that approach. Using Azure Data Factory is much better than using any other ETL tool for Azure so why would you pay for another tool? ##### Have more questions? I am happy to help you, feel free to reach out to hello@siva.blog.
