---
title: "How to choose the best ETL tool for your modern data stack?"
description: "Navigate the complex landscape of ETL tools with our guide, designed to help you make an informed decision amidst a sea of options."
summary: "Cut through the clutter of the ETL tool market with our insights, helping you select the perfect tool for your data stack in the ever-evolving data landscape."
date: 2021-12-15T10:00:00+02:00
lastmod: 2021-12-20T10:00:00+02:00
draft: false
weight: 50
categories: ["Data Platforms"]
tags: ["Data Platform Engineering"]
contributors: []
pinned: false
homepage: false
type: blog
seo:
  title: "Choosing the Right ETL Tool for Your Data Stack: A Comprehensive Guide"
  description: "Discover how to select the best ETL tool for your data stack with our expert guide, simplifying your choice in the complex and rapidly growing data ecosystem."
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---


*In this blog, we break down the Paradox of choice to help you pick the right ETL tool! If you have seen the* [*2021 MAD*](https://mattturck.com/data2021/) *(Machine Learning, AI & Data) chart by Matt Turks, there are countless tools already available and is growing furiously. But how do you* choose the best ETL tool that works for you*? Here is the ultimate guide.*

Let’s reflect on the past for a moment before we see the current & future of these ETL/ELT tools. Around the 2000s, hardly any organization realized a need for such tools. Most developers would write pages of TSQL or Perl or SAS programs. When they realized that this was becoming unmanageable, they turned to ETL tools such as IBM Information Server (Datastage & Quality Stage), SSIS, Informatica or ABINITIO. Thats it. Most orgs had just one of them, maybe a few had more than one. All these tools have **one purpose**, **moving and transforming the data**.

The purpose of ETL/ETL has not changed for decades i.e. **“Moving and transforming data”**. What has continually changed and evolved are the *type(s) of data*, *data sources*, *data targets* and t*he way data move*. Unfortunately, those traditional behemoths such as IBM or Informatica are not evolving fast enough to catch up. That is where these newcomers have filled the gap and have flooded the market. All this in less than a decade’s time.

![Data-and-AI-Landscape-2021-v3-small](https://siva.blog/wp-content/uploads/2022/08/Data-and-AI-Landscape-2021-v3-small1-1024x530.jpg)[*Matt Turk’s Machine Learning, AI and Data (MAD) Landscape*](https://mattturck.com/data2021/)

Has the purpose changed? NO. So why do we have 100(s) of ETL tools today? How to choose the best ETL tool for your modern data stack? Am I going to miss something if I don’t use a particular tool? It’s time to deep dive.

**A summary of what will be discussed today:**

- Common Trends/Pitfalls
- Ultimate Guide: Choose the best ETL Tool
- Conclusion

## **Common Trends/Pitfalls**

Here are some of the common trends amongst the players in the marketplace today:

### 1# Open Source monetized by managed service

Many companies start with an open-source project, then commercialize the product. Talend, started as an OSS project, that still offers a free version of their tool, but caters enterprises with cloud and enterprise versions. The trend is to start or pick an open-source project, add support, and offer them as a managed service. [Databricks](https://databricks.com/solutions/data-engineering), [Elastic Search](https://www.elastic.co/enterprise-search/), [Airbyte ](https://airbyte.com/why-airbyte)and 100s of other companies fall under that category. They offer SaaS or PaaS without the hassle of having to manage those software packages.

### 2# Differentiate by building specialization in a specific area.

Other small players identify a niche and build their product around it to fill that specific gap. [Streamsets ](https://streamsets.com/solutions/cloud-data-warehouse-integration/)for example, is good at streaming small volumes, processing Change Data Captures events. dbt, is specialized in transformation, and does not offer E (extract) or L (load) or [FiveTran](https://www.fivetran.com/extract-load), which offers only data ingestion. Another example is [Xplenty ](https://www.integrate.io/product/etl/)and [HighTouch ](https://hightouch.com/blog/reverse-etl/)which market their product as “Reverse ETL”.

### 3# Upselling Capability

This category annoys me the most. Many tools such as Astronomer aka Apache Airflow and Prefect upsell their products as ETL tool. No, they are not ETL tools rather, they are meant for orchestration. Atlas Mongo DB sells themselves as a search db as well as a data lake now, oh please! [SingleStore ](https://www.singlestore.com/solutions/#use-cases)Database, I still couldn’t wrap my head on what it is specialized for. They claim it can be used for anything from microservices to analytics.

### 4# Complex Pricing

Another common pitfall is pricing. Each provider comes up with their own terminology for pricing such as credits, units etc. Some products offer pricing based on the number of sources or targets. While others offer based on number of records processed.

### 5# Partnering with competitors

Databricks introduced integration partners and it included [dtb](https://www.getdbt.com/product/what-is-dbt/), fiveTran, Tableau and a lot other ETL/ELT tool. Yet they advertise their tool as “All your data, analytics and AI on one platform”. So why do we need the other tools then?

## **Ultimate Guide: Choose the best ETL Tool**

### Step 1: Discovery

If you are an Enterprise Architect or Leader for a small-scale company or a large enterprise, it’s important to understand your current and future eco-system. This includes the technologies, databases, cloud service providers, resource skillset and roadmap.

This is a labelling exercise, where we tag the application/technology/platform with the domain. E.g. BigQuery & Snowflake as Warehousing, SalesForce as CRM, DB2z as Legacy CRM etc. Aggregate the no of data sources and estimated volumes for each domain.

This might seem like a painful exercise, especially for large enterprises, however if you are in the market for an ELT/ETL tool, this will be super helpful to make decisions.

### Step 2: Evaluate

There is no one size fits all solutions in the new world. You might end up having more than one toolset. At the same time, you don’t need tons of tools to do the job. Your modern ETL/ELT tools should be able to do the following:

1. Read/Write from the sources/destinations you identified in Discovery.
2. Handle the volume of your organization.
3. Able to stream data in Realtime/near Realtime.
4. Able to schedule or orchestrate workflows
5. support for advanced transformations & data processing libraries
6. Has a small or wide (widely adapted by the community) learning curve

The list above is a general guide; however, your organizational requirements may need more, feel free to expand that list.

### Step 3: Eliminate

If your organization has a guiding principle and a mature enterprise architecture, it is easy, however, many organizations don’t. Guiding Principles state the guard rails by which your application, choice of technology or reference architecture should align. For e.g.: A guiding principle might state that applications should be based on microservices architecture, or the technology should be open source, managed and located in the company CSP tenant. That is a topic by itself.

If you don’t have such principles, here are some tips:

1. **Pricing by consumption** – not by rows or volume. By limiting the pricing tier to rows, we are forced to design applications to fit the pricing tier. That is not a promising idea. Technology should not drive design decisions.
2. **Prefer data plane in your tenant** – Usually SaaS Products come with a control plane (UI/Admin functions) and a data plane. While SaaS products eliminate the administration hassle, they come with a lot of cost associated. The cost for the cluster, egress/ingress between the CSP, Private Endpoint and finally the Uptime SLA depends on their CSP and not your CSP. BTW, just because its SaaS, doesn’t eliminate the need for an Administrator.
3. **Supported by Infrastructure as a Code** (Terraform/ARM) – if a platforms infrastructure cannot be managed by IaaC such as terraform or Azure ARM templates, it’s not worth the investment. Automation is key to maturity, and sometimes lack of automation can radically slow down your progress.
4. **Zero Trust Security** – If the vendor systems are compromised, will your data be compromised too? Does the vendor need access to the data plane? or your tenant? If any of that is a yes, then it’s a no. I recently learned that Astronomer (aka Apache Airflow) needs access to your tenant to provision resources. While at first, the risk looks minimal and isolated, you need to define a special architecture for the vendor. IMHO, technology should not drive design decisions. Other factors to consider are if the vendor supports data encryption at-rest, in-motion, and customer managed encryption keys. Security is a topic on its own.
5. **Managed or Containerized Deployment** – The whole idea behind cloud is to avoid administration hassle. However, if your vendor wants their software package to be installed on a VM on the cloud, which defects the original purpose. Ensure that the package can be containerized or if it’s a VM, it’s managed by the vendor.
6. **Well-funded or well contributed** – tons of startups produce great ideas, but the sad truth is only a few survive, and a handful thrive. If it’s an open-sourced product, check out their repo and validate their claims (no contributors and no forks). Also review who their investors/customers are. Some companies are privately held, such as Zoho

### Step 4: Settle down

At some point, you need to settle down on a toolset that works for you. One way to validate is answering these questions:

1. Can the tool meet our enterprise data volume?
2. Can I learn the tool quickly and start realizing value out of it?
3. Do I need a specialized skillset to adapt to this tool?
4. Will i have to buy more tools to support this one?
5. How much time should i spend if there is a) minor upgrade b) major upgrade?
6. Will the tool help achieve our strategic goals?

I should come up with a tool kit for evaluating softwares. But for today, I would like to wind down with a couple of architectural rules from “Fundamentals of Software Architecture”.

> There are no bad decisions, only expensive ones.
>
> *-Fundamentals of Software Architecture*

Another interesting rule to remember is:

> Your goal should be to make a less wrong decision, not a perfect decision. Any decision made today will most likely become wrong in future.
>
> -*Fundamentals of Software Architecture*

### Step 5: Upskill

Adding a technology stack is one thing, encouraging your team/org to adapt to it is another. Upskilling is key to your success. A lot of these tools can do so many wonders unless you know how to use them.

> Upskilling and digital dexterity will outweigh tenure and experience.

If you are transforming your traditional data engineers to cloud, here is an article on [How to become a Cloud Data Engineer?](https://www.siva.blog/post/how-to-become-a-cloud-data-engineer) .

## Conclusion

If you are expecting me to suggest or recommend a tool in this post, sorry to disappoint you. My goal was to lay the foundation for choosing the right ETL tool, not necessarily make that decision for you. If your organization is looking for a citizen integration, and if I suggest Apache Spark or Databricks, then that would be a blunder.

But I would like to give you some examples in each cloud eco-system.

#### Azure Data Engineering Stack

![Data Engg using Azure stack](https://sivastech42fp1.blob.core.windows.net/images/Data-Engineering-Azure.jpg )
Azure Data Engineering Stack- Batch/Streaming ELT/ETL – Azure Data Factory
- Streaming Broker – Event Hub
- Orchestration – ADF for general Pipelines, Synapse for Analytics
- Data Engineering Platform- Azure Synapse Analytics, Azure Databricks, HD Insights.
- Storage – Azure Data Lake Storage, Azure SQL Server

#### GCP Data Engineering Stack

![Data Engg using GCP stack](https://sivastech42fp1.blob.core.windows.net/images/Data-Enginnering-GCP.jpg)
Google Cloud Platform (GCP) Data Engineering Stack- Batch ELT Data FLow (Managed Apache Beam)
- Streaming ELT – Google Pub/Sub + Data Flow
- Orchestration – Cloud Composer (Managed Apache Airflow)
- Data Engineering – Data Flow, Data Prep, Data Proc, Data Fusion, Databricks (just stick with a couple)

#### Open-Source Data Engineering Stack

![Data Engg using Open Source stack](https://sivastech42fp1.blob.core.windows.net/images/Open-Source-Data-Engineering.jpg ) Open Source Data Engineering Stack- Batch ELT Data FLow (Apache Camel, NiFi)
- Streaming ELT – Kafka
- Orchestration – Cloud Composer (Managed Apache Airflow)
- Data Engineering – Apache Spark, Beam, Flink

**Would you like to contact me for ideas, questions or for collaboration?**

I am passionate about data and have been[ working with and exploring tools](https://www.siva.blog/about) for over 16 years now. Data technologies amazes me, and I continue learning every day. Happy to help!
