---
title: Bilingual self-service portal for a security assessment process
summary: A bilingual web application that gives project teams one place to work through a formal security assessment process, built full stack with automated delivery pipelines.
category: work
period: "2026"
role: Lead developer and architect
organization: A Government of Canada department
stack:
  - React
  - TypeScript
  - Vite
  - Government of Canada Design System
  - i18next
  - Node.js
  - Express
  - Docker
  - Azure DevOps
  - Azure Container Registry
  - Azure Container Instances
  - PowerShell
  - Postman
outcome: Delivered a bilingual, self-service platform for the security assessment process, deployed through multiple environments with automated build, deployment and verification.
order: 101
draft: false
approval: approved
---

## Problem

Project teams across the department had to work through a formal security assessment process, but there was no single place to do it. They needed one self-service, bilingual web application where they could submit security intake records, track the deliverables the process requires, and find guidance.

## My role

I was the lead developer and architect. I led the design and implementation, engineered the delivery pipelines and wrote the system's own security documentation. I worked with security assessors, platform engineers and junior developers.

## What I did

- **Frontend.** A single-page application in React, TypeScript and Vite, built with Government of Canada Design System components. It is bilingual, using i18next.
- **Backend.** A REST API in Node.js and Express, written in TypeScript like the frontend. It also includes an endpoint that proxies an AI chat feature.
- **Type safety.** I enforced strict TypeScript compilation across the frontend and backend, with a type-check step as a build gate in the CI pipeline.
- **Delivery.** I packaged the application as Docker containers, using multi-stage builds. Azure DevOps pipelines build the images and push them to a container registry. They then roll the containers out to Azure Container Instances in multiple environments and run smoke tests after each deployment. Dependency vulnerability scanning runs in the pipeline.
- **Testing.** I checked the API endpoints and the health of each deployment with Postman collections and automated smoke checks written with curl and PowerShell.
- **Documentation.** I wrote the system's own security assessment documentation, including its architecture diagrams and related security documents.

## Challenge

Each redeployment of the containerized service changed the IP address it was running at, so other components could no longer reach it by its DNS name. I scripted a pipeline stage with the Azure CLI that queries the new address and updates the DNS record automatically, so that redeployments need no manual step.

## Outcome

I delivered a bilingual, self-service platform for the security assessment process, deployed through multiple environments. Build, deployment and verification are automated through the pipelines.
