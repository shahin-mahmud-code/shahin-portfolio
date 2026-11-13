---
title: iCanBeWell
summary: A bilingual preventive-health app for Canadian clinicians and the public. I built its analytics and testing pipeline, then led the team that shipped version 2.
category: university
period: July 2022 – April 2023
role: Application Developer, then Team Lead (Application Development)
organization: University of Ottawa
stack:
  - React
  - JavaScript
  - Bootstrap
  - Firebase
  - Google Analytics
  - BigQuery
  - Azure Data Factory
  - Power BI
  - Cypress
  - GitHub
  - TravisCI
  - Agile Scrum
outcome: Analytics pipeline delivered ahead of the deadline; version 2 launched in April 2023 with gender-inclusive health pathways.
links:
  - label: iCanBeWell (icanbewell.ca)
    href: https://icanbewell.ca
order: 1
draft: false
approval: not-applicable
---

## Problem

iCanBeWell is a bilingual (English and French) preventive-healthcare application, on mobile and web, used by Canadian clinicians and the general public.

In summer and fall 2022 the project had no end-to-end view of how people used it and no automated UI testing. Firebase's free tier also kept only one month of history, so trends over time were lost. By winter 2023 the original codebase needed an architectural redesign: simpler navigation, less clutter, and health recommendations that included transgender and non-binary users.

## My role

I worked on the project in two phases:

- **July – December 2022:** Application Developer, as a volunteer and work-study position, focused on analytics, testing and quality.
- **January – April 2023:** Team Lead, Application Development. I led a team of five graduate-student developers as part of a graduate course, the Industry Internship Project.

## What I did

### Analytics, testing and quality (summer – fall 2022)

- Designed and implemented an end-to-end analytics pipeline from the React and Firebase web app to Google Analytics, BigQuery, Azure Data Factory and Power BI. It tracked user demographics, page views, clickstreams and engagement with medical topics.
- Worked around Firebase's one-month data retention by scripting a scheduled monthly backup and export into BigQuery, so long-term analytics were preserved in Power BI.
- Ran functional, usability, cross-browser and automated end-to-end tests with Cypress, and set up continuous integration builds with GitHub and TravisCI.
- Proposed and implemented search engine optimization improvements to make the public site easier to find.

### Version 2 (winter 2023)

- Led the team using Agile Scrum and MoSCoW prioritization to design and deliver version 2 in React, JavaScript, HTML5, CSS3, Bootstrap and Firebase.
- Redesigned the interface and the clinical rule engine to support transgender and non-binary users alongside cisgender male and female profiles, working with medical stakeholders to validate the gender-inclusive screening logic.
- Managed pull requests, code reviews, sprint backlogs, weekly client demos and continuous deployment to Firebase Hosting.

## Challenge

Two developers on the team had limited React experience and conflicting class schedules. I paired them with experienced teammates, recorded walkthroughs, and used MoSCoW prioritization to protect the most important version 2 deliverables.

## Outcome

- Delivered the first testing and analytics milestone one week ahead of its July 15, 2022 deadline, and launched the full BigQuery and Power BI analytics pipeline in the first week of August 2022.
- Launched version 2 in April 2023, with a modernized React architecture and inclusive preventive-health pathways for transgender and non-binary Canadians.
