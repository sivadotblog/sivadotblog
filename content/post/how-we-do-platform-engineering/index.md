---
title: "How We Do Platform Engineering"
description: "Discover how we solved five critical platform engineering challenges that derail teams—from Terraform configuration complexity and validation failures to environment drift and cross-system orchestration. Learn practical solutions using YAML, Pydantic validation, Jinja templates, and three-layer architecture that reduced deployment failures and improved maintainability at scale."
summary: "Discover how we solved five critical platform engineering challenges that derail teams—from Terraform configuration complexity and validation failures to environment drift and cross-system orchestration. Learn practical solutions using YAML, Pydantic validation, Jinja templates, and three-layer architecture that reduced deployment failures and improved maintainability at scale."
date: 2023-01-15T10:00:00+02:00
lastmod: 2023-01-15T10:00:00+02:00
draft: false
weight: 50
categories: ["Platform Engineering"]
tags: []
contributors: []
pinned: false
homepage: false
type: blog
seo:
  title: "How We Do Platform Engineering"
  description: "Discover how we solved five critical platform engineering challenges that derail teams—from Terraform configuration complexity and validation failures to environment drift and cross-system orchestration. Learn practical solutions using YAML, Pydantic validation, Jinja templates, and three-layer architecture that reduced deployment failures and improved maintainability at scale."
  canonical: ""
  noindex: false
---

You'd think that after spending millions on cloud infrastructure and hiring the best engineers money can buy, platform engineering would be... straightforward. It's not.

I've been leading cloud platforms for over a decade, and I'll tell you what nobody mentions in those glossy vendor presentations. The tools work. The engineers are brilliant. But somewhere between strategy and execution, something derails. Not because of technical incompetence, but because we're asking platform engineers to solve problems with tools that weren't designed for the complexity we've created.[^1]

This isn't a story about fixing broken infrastructure. It's about the five challenges that consistently derail platform engineering teams—and how we solved them without rewriting everything from scratch.

## Challenge 1: When Configuration Becomes Code Soup

Every VP inherits technical debt. Mine came in the form of Terraform files that looked like they'd been written by a committee of very tired engineers at 3 AM. And they probably were.[^2]

The problem wasn't Terraform itself. It was how we were using it. Complex database configurations, role hierarchies, and permission structures all crammed into `locals.tf` files. Onboarding a new engineer meant handing them a 2,000-line configuration file and saying "good luck." Changing a single schema meant hunting through nested maps and praying you didn't break production.

Here's what that looked like:

**Traditional Terraform (locals.tf):**
```hcl
locals {
  database_1 = {
    name         = "mindsbeyond_training"
    environments = ["npe"]
  }

  schema_beyondai_core = {
    database = "mindsbeyond_training"
    tags = [{
      environment              = "npe"
      mindsbeyond_billing_id      = "DEP069266"
      snowflake_environment   = "npe"
    }]
  }

  az_roles = {
    beyondai_core = {
      database    = "mindsbeyond_training"
      owner       = "az_snowflake_beyondai_admin"
      contributor = "az_snowflake_beyondai_developer"
      rw          = "az_snowflake_beyondai_rw"
      ro          = "az_snowflake_beyondai_ro"
    }
  }
}
```

Now here's the same configuration in YAML:

**Our YAML Configuration:**
```yaml
database: mindsbeyond_training
environments:
  - npe
schemas:
  - schema: beyondai_core
    az_roles:
      owner: az_snowflake_beyondai_admin
      contributor: az_snowflake_beyondai_developer
      rw: az_snowflake_beyondai_rw
      ro: az_snowflake_beyondai_ro
    tags:
      - environment: npe
        mindsbeyond_billing_id: DEP069266
        snowflake_environment: npe
```

The difference is immediate. Anyone can read YAML. Not everyone can parse nested Terraform locals. We separated configuration from infrastructure logic, and suddenly our platform became accessible to engineers who didn't eat, sleep, and breathe Terraform.[^1]

## Challenge 2: Catching Fires Before They Start

Here's a conversation I've had too many times:

**Engineer:** "The deployment failed."

**Me:** "What broke?"

**Engineer:** "Terraform apply threw an error."

**Me:** "What error?"

**Engineer:** "A resource reference that doesn't exist."

**Me:** "Didn't we validate this?"

**Engineer:** "...Terraform doesn't validate that until apply."


By the time Terraform tells you something is wrong, you've already burned 20 minutes of CI/CD pipeline time, blocked other deployments, and discovered the error in the worst possible way—during execution.[^2]

We needed pre-flight checks. Validation before Terraform ever touched our infrastructure.

**Our Solution: Pydantic Validation Layer**

We built a validation pipeline using Python's Pydantic models. Before any YAML configuration reaches Terraform, it passes through strict schema validation. Type checking. Required fields. Semantic verification. Resource existence checks.[^1]

```kroki {type=mermaid}
graph LR
    A[YAML Config] --> B[Pydantic Validation]
    B --> C{Valid?}
    C -->|No| D[Error Report]
    C -->|Yes| E[YAML Decoding]
    E --> F[Terraform Template]
    F --> G[Terraform State]
    D --> H[Fix & Retry]
    H --> A
```

Now errors surface in seconds, not minutes. Engineers get immediate feedback. The CI/CD pipeline doesn't waste time on malformed configurations. And most importantly, we catch problems before they reach production.

## Challenge 3: The Environment Drift Problem

Dev doesn't match test. Test doesn't match prod. Prod doesn't match last week's prod. This is the reality of manual configuration management at scale.[^2]

Every "quick fix" that bypasses the standard process creates drift. Every emergency change that "we'll document later" adds entropy. Eventually, nobody knows which environment represents the actual standard anymore.

**The Inconsistency Problem:**

```kroki {type=mermaid}
mindmap
  root((Environments))
    Development
      Manual edits
      Ad hoc changes
      Undocumented fixes
      Different schemas
    Testing
      Partial configs
      Missing roles
      Outdated permissions
      Legacy settings
    Production
      Production only changes
      Hotfixes not backported
      Different tag structures
      Inconsistent naming
```

We needed more than documentation. We needed enforcement. Not through policy that people ignore, but through automation that people can't bypass.

**Our Solution: Jinja-Templated Terraform**

We render Terraform configurations from Jinja templates, driven by validated YAML. Every environment generates from the same source of truth. Consistency isn't a goal—it's guaranteed by the system itself.[^1]

```jinja
{% for schema in database.schemas %}
resource "snowflake_schema" "{{ schema.name }}" {
  database = {{ database.name }}
  name     = "{{ schema.name }}"

  {% for key, value in schema.tags.items() %}
  {{ key }} = "{{ value }}"
  {% endfor %}
}

{% for role_type, role_name in schema.az_roles.items() %}
resource "snowflake_schema_grant" "{{ schema.name }}_{{ role_type }}" {
  database_name = {{ database.name }}
  schema_name   = snowflake_schema.{{ schema.name }}.name
  privilege     = "{{ role_type | upper }}"
  roles         = ["{{ role_name }}"]
}
{% endfor %}
{% endfor %}
```

**After Our Strategy:**

```kroki {type=mermaid}
graph TD
    YAML[One YAML Source] --> Template[One Jinja Template]
    Template --> Engine[Single Deployment Engine]
    Engine --> Dev[Development]
    Engine --> Test[Testing]
    Engine --> Prod[Production]
```

When configuration becomes code, and templates generate infrastructure, drift stops being possible.

## Challenge 4: Orchestrating Across the Chaos

Your platform doesn't live in one system. It spans GitHub, Argo, Prefect, Entra ID, Snowflake, and a dozen other tools. Each one has its own API. Its own authentication model. Its own failure modes.[^3][^4]

Asking platform engineers to manually orchestrate workflows across these systems is like asking them to conduct an orchestra where every musician speaks a different language.

We built an integration layer. API-driven orchestration for cross-system communication. Prefect and Argo for dependency management. GitHub Actions for CI/CD triggers. Not abstracting away complexity—that's impossible—but handling the translation work so engineers don't have to.[^5][^1]

The magic isn't in any single tool. It's in how they connect.

## Challenge 5: Not Everything Belongs in Terraform

As platforms grow, so does the Terraform object count. Roles. Schemas. Permissions. Grants. Tags. Policies. Soon your codebase looks like a hoarder's apartment—technically functional, but impossible to navigate.[^1]

We realized something crucial. Not everything deserves to be a Terraform object.

**Our Three-Layer Architecture:**

- **True Infrastructure** (Terraform): Storage, compute, network, database instances
- **Entitlements** (Microservices): Roles, schemas, permissions, service accounts
- **Process Flows** (Orchestration): Triggers, dependencies, workflows

This "fit-for-purpose" approach reduced complexity, improved maintainability, and gave engineers clarity about where to make changes and how to make them safely.[^6][^5]

## What This Actually Means

Platform engineering isn't about tools. It's about removing friction. Every validation script, every template, every abstraction layer exists to answer one question: how do we make this easier and safer for our engineers?

YAML over Terraform locals. Pydantic validation before deployment. Jinja templates instead of manual configuration. Integration layers that handle complexity. Modular design that respects tool boundaries.

These aren't just technical decisions. They're investments in velocity. In reliability. In the sanity of the engineers who keep your platform running at 2 AM when something breaks.

Because great platform engineering isn't about being clever. It's about building systems that make sense. Systems that fail gracefully. Systems that tell you what went wrong and exactly how to fix it.

That's how we do platform engineering. Not by adding more tools, but by making the existing ones work for us instead of against us.

---

[^1]: [Platform Engineering Explained](https://www.bunnyshell.com/blog/platform-engineering-explained-the-ultimate-guide-/)
[^2]: [How We Improved the Developmentevelopers)
[^3]: [Netflix Platform Console](https://platformengineering.org/talks-library/netflix-platform-console-to-unify-engineering-experience)
[^4]: [Netflix Tech Blog](https://netflixtechblog.com)
[^5]: [YouTube Resource](https://www.youtube.com/watch?v=6ANWR2LdVSU)
