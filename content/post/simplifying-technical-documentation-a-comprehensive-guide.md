---
title: "Simplifying Technical Documentation: A Comprehensive Guide"
description: "Here’s a step-by-step guide, filled with a healthy dose of sarcasm and a pinch of merciless humor"
summary: "You can use blog posts for announcing product updates and features."
date: 2023-09-07T16:27:22+02:00
lastmod: 2023-09-07T16:27:22+02:00
draft: false
weight: 50
categories: ["Enterprise Strategies"]
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

Word docs, SharePoint, confluence, OneNote, notion and a ton of other tools are available today for technical documentation. But are the tools effective? Is the documentation useful? Is it accessible? Is it kept updated? How are you ensuring that there are no duplicate copies elsewhere? How are you making sure that it stays relevant? Mostly importantly how much time is your team spending on documentation?

In this blog post I will discuss some effective ways to streamline technical documentation. But first, I want to clarify why I spent time on doing this research and exercise. In my organization, documents are spread across so many platforms. It hit me hard, when a team spent 2 months to write SOPs and in matter of months, most of those documents became irrelevant. The other issue was, in practice, while executing a run book, we uncovered so many issues that we required an expert or the original developer to be along while executing the playbook.

# Scope

Most enterprises and teams fail to understand the need for documentation. Documentation is considered as a cherry on the top of a deliverable. It's the last thing developers work on an IP sprint. Prove me wrong! But why documentation in the first place? Delegation and Repeatability.

### Delegation

Documentation is the most important way of delegating work effectively and finding new and better ways to manage teams and projects. A well-crafted technical document can serve as a reference for those who are responsible for carrying out the work, and it can also help to ensure that everyone is on the same page on the expected outcome. This clarity can save time and reduce confusion, leading to more efficient and effective work

### Repeatability

The idea behind avoiding reinventing the wheel is to utilize existing resources, knowledge, and solutions rather than starting from scratch every time. This approach can save time, effort and resources. In technical documentation, this means that previous work, research and documents should be referred to and used as a starting point to create new documents.

# Problem

With so many tools at play, countless issues arise within the organization. Organizations mature in terms of technology and innovation. However, many organizations lack the discipline to produce quality documents. Producing quality documents that articulate the tasks at hand with clarity is equivalent or even better than hiring more people. Lets discuss some of the key challenges companies face today.

![](https://sivastech42fp1.blob.core.windows.net/images/service-now-confluence-onenote-documentation.jpg)

### Silo documentation

In organizations, different teams use and advocate for different tools and places to store documents. Enterprise Architecture team, for instance, might find Service-now Knowledge base as a central tool since its centralized. But in reality, service-now sucks at documentation. It's slow, hard to associate articles and hard to find articles unless you bookmark them. Even the URLs, service-now create are useless.

On the other hand, teams use SharePoint. It promises versioning, however SharePoint by-default is locked down to a specific group of people for editing/viewing, unless your SharePoint team admin makes it public for the whole enterprise. That is rare. Confluence may be a good middle ground, but it comes with a cost. Also, unless the whole company is in confluence, the problem still exists. Having said that, confluence does not eliminate the other problems such as reliability, versioning and the effort involved.

### Reliability of the document

Unless there is a process to ensure that the documents are updated every time the application is updated, there is no guarantee that the document is reliable. But 99% of the time, code-base lives in git platforms like github or gitlab, while the documents live elsewhere. When a code is reviewed, and a PR is approved, documents are never updated or reviewed. Soon as a PR is merged, documents become outdated, irrelevant, or sometimes even obsolete.

### Document Versioning

Back to SharePoint, versioning is in-build, however the team still use -v1.docx, -backup.docx etc. The psychology behind appending \_v1.docx to a file name even when using version control systems like SharePoint is often driven by a number of factors, including the need for increased visibility and transparency, the desire for a personal backup of the work, and the fear of losing or overwriting information. This behavior can stem from a lack of understanding of the capabilities of the version control system, a lack of trust in the technology, or a preference for manual processes.

### Effort of documentation

Word document starts with a template. Template is meant to make lives easier, however, templates are filled with a ton of questions and placeholders to cover all possible scenarios. And because it has a placeholder, developers fill in as much as possible. This eventually defeats the purpose of a template. Another issue with template is when referencing another document. Let's say there is a prerequisite to get access to Artifactory, developer might end up writing the steps to get access or referencing the link to the document. Every document now must reference copy past the same content. You may wonder why not create a separate document and reference the prerequisites, now what is the reliability of that document?

What about formatting the document? which font should I use, what colors should the table be. what is the font size for the bullets? Thats a whole paradox of choice resulting in time wasted.

# Solution

![](https://sivastech42fp1.blob.core.windows.net/images/github-readme.jpg)

My solution is based off a simple approach. proposed solution is based on the idea that documentation should be part of the application, and therefore, part of the version control. This means that every application should have a detailed documentation index, hosted in a readme.md file in the enterprise git platform, such as GitHub or GitLab. The documentation should be written in simple, markdown format and serve as the single source of truth.

This is not new. This is how a lot of open-source communities operate. Yet, it is something that enterprises overlook.

What if my documentation is not associated with an application? You could still host your documentation on github with markdowns. You don't necessarily need an application to go along with your documentation.

The idea here is that every application should include detailed documentation in their application repository. A well-documented repository (using Readme.md and other markdown files), complete with How-to's, standard operating procedures, troubleshooting guides, and other relevant information, is crucial for effective management of the application.

How does that solve the problem? Let's look at it.

### Accessibility

100% of the developer community, SREs and operations use the enterprise git platform be it GitHub or GitLab or others. Also, these platforms are not meant to store sensitive information unlike SharePoint and so granting read permissions at enterprise level for all users is not a challenge. This means, the documents are accessible by everyone who needs technical guidance. Think about it like an internal-open source.

Searching for these artifacts is now a breeze. Imagine searching for how to increase a mongodb cluster size and boom you have the latest information.

### Governed and Reviewed

Now Readme.md is a part of your code review. Your developer's code cannot go into production without passing a peer review. You may ask, what if the reviewer overlooks the documentation? That also means your reviewer may overlook the application code, so that's a resource problem, the process works. Maturing the documentation makes your lifer easier, remember the goal, delegation and repeatability.

### Automation

With git and GitHub (or similar) comes automation. There are a dozen tools that automate documentation. For example, [terraform-docs](https://github.com/terraform-docs/gh-actions) automatically document your terraform modules inputs and outputs with its versions. This is just scratching the surface; automation can do much more like notifying other app developers or users about the changes in the application or documentation.

I will write a separate article on some of the automation ideas. At one point I was able to automate infrastructure documentation. A terraform module would query my subscription and filter all the resources I need and create a Json file. This was parsed into a .md file and checked in to my documentation repo. Sounds interesting?

### Collaboration

One of the benefits of GitHub is collaboration. Understandably, word docs, SharePoint and even wiki tools such as confluence offer collaboration, but once someone is authorized to make edits, there is no control over what can be modified. Yes, I hear you, there is version control, but how would you track subtle changes that could potentially have large impacts. What if the original says ***read-only access*** and someone changes it to ***administrator access***? Subtle enough to go unnoticed, potential enough to cause a data breach.

With git, anyone in the organization could create an issue or even go one step further to contribute to the document and create a pull request. Only the owners of the document can review and approve the change.

### Ease of documentation

We talked about templating before. Unnecessary effort goes into formatting, branding and filling in unwanted information in the template. Additional effort goes into maintaining and updating the document links wherever necessary. Even more effort goes into making it accessible and communicating.

With git managed documentation, all this goes away. A developer documents what is necessary for the application using minimal formatting in markdown language. Markdown is a language even kindergarteners can pick up in a matter of hours. The location of the document is attached to an application, so if someone knows where the repo is, they know where the documentation is. Once this becomes a practice, the effort to find a repo or its documentation becomes way easier.

### Other benefits.

This way, documentation is no longer IP Sprint work, instead it's a continuous improvement process and part of the application. Another amazing benefit is the document versioning. Applications release 1 is attached to its respective documentation and so is release 2. This would have been a struggle on other platforms.

# Trade-Offs

Ok, this is not a perfect solution. There are trade-offs. Afterall the first rule of software architecture is everything in software architecture is a trade-off. Let's see how we can overcome some of them.

### With this approach there is not a single pane of glass to view your documentation.

Yes & No. Yes there is not one, not if you are able to put a little extra effort and leverage automation to your benefit. Headless and static content management systems make it super simple to host documentation sites. By leveraging the power of github actions + a static web framework like Hugo, you can build that single pane of glass. The effort involved in doing this is a matter of days.

All you need to do is host a GitHub pages site using Hugo or a similar markdown-based web framework and add a GitHub action to push the markdown files from all the application repos you care about. Thats it. I know I am simplifying it because it is. I'll share a demo soon.

### It's not possible to build an intuitive documentation without an editor like word or confluence.

Poor excuse. [Microsoft Learning (github.com)](https://github.com/MicrosoftLearning) is completely built of markdowns. There is no way you can complain about markdowns now.

### Git platforms access controls

Yes, this is a real trade-off. If your organization for some reason restricts access to repositories, then it's not easy to implement this approach. But I question why are repos restricted? DRY (Do not repeat yourself) is a principle of programming and one way to follow DRY is to search for problems already solved by other teams.

On the other hand, if Enterprise users segmented their GitHub organizations based of Line of Businesses, then that's an interesting problem. Searching across Orgs might be a challenge, especially if its access is controlled. But there is a defined reason those organizations are isolated. So, the case for working across LOB's should be an exception or the scenario is negligible. One use case that is slightly more impacted are teams like shared services. Shared services might be their own Line of Business aka an isolated org and those technical documents live in their GitHub Org. In that case, to search documents, developers might have to switch to shared-services org to search.

But this problem exists with SharePoint, and confluence as well. Documentation in GitHub still has an edge because switching and searching in GitHub is easy.

Interestingly, my idea about building a single pane of glass would work here as an alternative.

### Repository clones and duplicate documentation

Another legit trade-off. Often developers take a clone of another repo resulting in document duplication. Keep in mind that search results are displayed only from the default branch. So, if you are finding duplicate documentation in the default/main branch, it's probably because the branch is not protected, or they are not following the process/devops practices. I can see this happening especially for template repos. To be fair, this can happen to any template documentation, be in word or other wiki tools.

Another point to notice is, the application/documenation repo is still the source of truth is still in its own repo and will have just one set of documentation. Unlike SharePoint that could potentially host _v1 _v2 and _v2-updated.

# Conclusion

Technical documentation can be a challenging and time-consuming task for many organizations. With the numerous tools available today, it's easy to get overwhelmed and fail to choose the right one that suits your needs. The key problems that organizations face with documentation include silo documentation, unreliable documents, versioning issues, and the effort required to maintain it.

However, there is a simple solution to streamline the process of technical documentation. By incorporating documentation into the application and making it part of the deployment and version control process, organizations can overcome these challenges. This approach not only ensures accessibility but also reliability, version control, and effortless maintenance of the documents.

By adopting a simple, markdown-based documentation indexed by markdown files that includes How-Tos, SOPs, troubleshooting, and managing the application, organizations can ensure that the documentation is accessible and serves as the single source of truth for all teams including operations, development, and IT.
