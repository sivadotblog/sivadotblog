---
title: "CI/CD Methods for Databricks Notebooks"
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
## Overview

Hey there! Let's talk about deploying Databricks notebooks through CI/CD pipelines and Github actions or Azure DevOps. There are multiple methods available to deploy Databricks notebooks and jobs. here are multiple methods available to deploy Databricks notebooks, and we'll cover some of these methods, along with their pros and cons. We'll also provide our recommendation on the best method to deploy Databricks notebooks.

## Methods

### 1. Using Github/Azure DevOps repo pull (Recommended)

The first method we recommend is using Github/Azure DevOps repo pull. It's the simplest and cleanest method of all. In this method, we'll create a Databricks job that will pull the notebooks from the Github/Azure DevOps repo and run them. There are no additional CI/CD setups required to achieve this, and all the touchpoints such as the git repo, workspace, and notebooks are isolated. There is no complex token management required either.

Databricks Jobs API, accepts `git_source` as an argument when you can pass the repo url, branch/tag etc. The job will then pull the notebooks from the git repo and run them. Refer to the [Databricks Jobs API documentation](https://docs.databricks.com/api/workspace/jobs/create) for more details.

Databricks Workflows, Prefect and Airflow also supports Repo pull method. However, its important to note that, repo pull heavily relies on the availability of the git provider (Github/Azure DevOps). If the git provider is down, then the Databricks jobs will fail. Lets assume a GIT token expires, or the organizational policy resets system accounts token, pretty much all jobs that rely on the git token will fail.


![Repo Pull](https://sivastech42fp1.blob.core.windows.net/images/databricks-cicd-repo-pull.png)

### Pros

1. Simple and no additional CI/CD setup required.
2. No complex credential management required.
3. All the touchpoints are isolated.

### Cons

1. Collaboration is difficult as all developers work in silo within their own branch.
2. Code review can be difficult as most reviews happen in Github and not in Databricks Workspace.
3. Downtime of Github/AzureDevOps will impact Databricks jobs.

### Dependencies

1. The actor who is deploying the notebooks (typically Azure Service Principal) needs to set up a git token in the Databricks workspace.


## 2. Using Repos API

Databricks offers the Repos API to manage the notebooks in the workspace. We can also use this API to pull the notebooks from git as part of the CI/CD pipeline and sync it with Databricks Repos. Refer to the [Databricks Repos API documentation](https://docs.databricks.com/dev-tools/api/latest/repos.html) or [Databricks Repos](https://www.databricks.com/product/repos) for more details.

![Using Repos API](https://sivastech42fp1.blob.core.windows.net/images/databricks-cicd-repos-api.png)

> If you are interested in this method, here is my [template repo](https://siva.blog/post/databricks-howto-deploy-repos-api/) that you can use to get started.

### Pros

1. Collaboration is easy as all developers' work is available in the workspace under Repos.
2. Code review is easy as all the reviews/results can happen in the workspace.

### Cons

1. Additional CI/CD setup required to pull the notebooks from git.
2. Anyone having manage access can alter the notebooks in the workspace. Access Control needs to be governed properly.
3. Switching between release branches is difficult as you will have to create separate repos for each release.
4. Adding more notebooks to the workspace counts towards the storage limit of the workspace.

### Dependencies

1. The actor who is deploying the notebooks (typically Azure Service Principal) needs to set up a git token in the Databricks workspace.

## 3. Using Workspace API

This is a traditional way of CI/CD where you import notebooks from the git repo to the workspace and create folders under the workspace directory. You can then create a Databricks job to run the notebooks from the workspace directory. This is the least recommended method.

![Using Workspace API](https://sivastech42fp1.blob.core.windows.net/images/databricks-cicd-workspace-api.png)
### Pros

1. Collaboration is easy as all developers' work is available in the workspace under Repos.

### Cons

1. Additional CI/CD setup required to pull the notebooks from git.
2. Anyone having manage access can alter the notebooks in the workspace. Access Control needs to be governed properly.
3. Folders and notebooks could eventually grow and become unmanageable. It's possible that you end up importing too many release folders or notebooks can become stale.

## Conclusion

In conclusion, the first method provides the most straightforward and efficient approach to deploy Databricks notebooks through CI/CD pipelines. We recommend considering the pros and cons of each method and selecting the one that aligns best with your team's specific needs and requirements. By adopting this recommended approach, you can ensure a seamless and streamlined deployment process for your Databricks notebooks.

While other methods like using Repos API and Workspace API offer their own advantages, such as enhanced collaboration and easy code review, they come with additional complexities and potential drawbacks, such as managing access control and storage limitations. Ultimately, the decision is up to you and your team to determine which method is best suited for your specific needs and requirements.
