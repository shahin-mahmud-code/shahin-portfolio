---
title: Automated accessibility testing platform with AI-assisted remediation guidance
summary: A web application that audits Power Apps and other web applications for WCAG 2.1 and 2.2 AA with several testing engines, then uses a large language model to turn the findings into remediation guidance.
category: work
period: "2025 – 2026"
role: Lead developer and architect
organization: A Government of Canada department
stack:
  - React
  - TypeScript
  - Vite
  - Government of Canada Design System
  - Node.js
  - Express
  - Puppeteer
  - Pa11y
  - Lighthouse
  - axe-core
  - Azure OpenAI
  - JSZip
  - Docker
  - Azure DevOps
  - Supertest
  - Postman
outcome: Sped up accessibility testing and remediation for application teams by replacing manual audits with automated scans and generated guidance.
order: 102
draft: false
approval: approved
---

## Problem

Accessibility audits against WCAG 2.1 and 2.2 AA were done by hand. They were slow, took a lot of effort and did not scale across a growing number of applications. They were hardest for applications behind a login, offline static builds and Power Apps source files, none of which a simple scan of a public page can cover.

## My role

I was the lead developer and architect. I designed and built the platform from front end to deployment, working with accessibility specialists, platform engineers and the application teams who used it.

## What I did

- **Scanning.** A Node.js and Express backend drives a headless browser with Puppeteer and runs several scanners side by side (axe-core, Pa11y and Lighthouse) together with custom WCAG inspection scripts. It normalizes their results into one JSON format.
- **AI-assisted guidance.** The normalized findings go to a large language model on Azure OpenAI, which turns them into remediation guidance that developers can act on.
- **Flexible input.** Teams can submit a live URL, a ZIP of static HTML, CSS and JavaScript, Power Apps source files, screenshots or DOM snapshots.
- **Frontend.** A React, TypeScript and Vite single-page application built with Government of Canada Design System components.
- **Upload handling.** I treated uploaded archives as untrusted input. The client checks the ZIP structure with JSZip before upload, and the server enforces size limits and extracts files safely.
- **Testing.** I wrote API integration tests with Supertest and checked the endpoints with Postman.
- **Delivery.** I packaged the application and its browser in a Docker image and automated build and deployment with Azure DevOps pipelines.

## Challenge

Two problems stood out. First, the AI analysis step could report success without having written its output file, so failures stayed hidden. I added an explicit check that the output exists and made errors propagate with structured messages. Second, the headless browser would not render pages reliably inside a container. Changing the base image and configuring the browser's sandbox and shared-memory settings fixed it.

## Outcome

Application teams in the department used the platform to speed up accessibility testing and remediation for Power Apps and web applications.
