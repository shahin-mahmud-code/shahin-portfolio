---
title: Guided architecture diagram generator
summary: A web application that turns guided questionnaire answers into architecture diagrams, using a large language model to produce diagram syntax.
category: work
period: "2026"
role: Lead developer, frontend and backend
organization: A Government of Canada department
stack:
  - React
  - TypeScript
  - Vite
  - React Router
  - Government of Canada Design System
  - Node.js
  - Mermaid.js
  - html-to-image
  - JSZip
  - Azure OpenAI
  - Postman
outcome: Automated the generation of framework-compliant architecture diagrams and downloadable image and ZIP bundles from guided questionnaires.
order: 100
draft: false
approval: approved
---

## Problem

Teams preparing a security assessment package for an application have to include architecture diagrams in a prescribed format. Many application teams had neither architecture tooling nor the specialist expertise to draw these diagrams from scratch.

## My role

I led the development of the application, covering both the frontend and the backend, and worked with stakeholders in architecture and security.

## What I did

The application walks a user through a multi-step questionnaire about their application and turns the answers into diagrams.

- **Frontend.** A single-page application in React, TypeScript and Vite, built with the Government of Canada Design System. I used strongly typed interfaces, shared context state and routing for the multi-step flow.
- **Backend.** A small Node.js HTTP service that uses the built-in `http` module and no web framework. It dispatches routes explicitly, parses JSON request bodies into structured data and raises typed validation errors.
- **Generation.** The backend sends the structured answers to a large language model (Azure OpenAI), which returns the diagram as text in the syntax of the diagramming library used for rendering.
- **Output.** Diagrams render live in the browser and can be edited interactively. Users can download them as JPEG images or as a ZIP bundle.
- **Testing.** I tested the endpoints and their failure cases using Postman, curl and small Node.js fetch scripts.

## Challenge

The model's output sometimes included markdown code fences or unescaped characters. Either one would break rendering of the diagram in the browser. I constrained the prompts and added a sanitization step for the generated syntax, so that the diagram renders correctly.

## Outcome

The application automates the generation of framework-compliant architecture diagrams, and of downloadable image and ZIP bundles, directly from guided questionnaires.
