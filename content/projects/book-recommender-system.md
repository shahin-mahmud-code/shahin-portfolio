---
title: Book recommender system
summary: A web application that classifies a book's genres from its summary and recommends similar books, through both a search page and a chatbot.
category: university
period: "June – July 2022"
role: Graduate student developer and data scientist
organization: University of Ottawa, Data Science Applications course (GNG 5125)
stack:
  - Python
  - Scikit-learn
  - Keras
  - Pandas
  - NumPy
  - Matplotlib
  - Flask
  - Google Dialogflow
outcome: Delivered a working web application that classifies book genres from raw summaries and recommends books through web search and chatbot conversation.
order: 3
draft: false
approval: not-applicable
---

## Problem

The final project for the Data Science Applications course asked for an end-to-end book recommender system. It had to combine content-based filtering, collaborative filtering and multi-label genre classification, and offer a conversational chatbot interface, all delivered as a web application.

## My role

I worked as a graduate student developer and data scientist in a group of classmates on the course's final project.

## What I did

- **Data.** Built one dataset from two public sources, the UCSD Goodreads (2017) dataset and the CMU Wikipedia book summary dataset, and organized it into a structured table of book ID, name, genre and summary.
- **Genre classification.** Implemented multi-label genre classification and compared One-Vs-Rest, Binary Relevance, Classifier Chains, Label Powerset and a deep-learning LSTM model with early stopping.
- **Recommendation.** Developed content-based and collaborative-filtering models with Scikit-learn, using Grid Search to find the best number of clusters.
- **Delivery.** Deployed the recommender in a Python Flask web application and integrated a Google Dialogflow conversational agent, so users can ask for recommendations in conversation.

## Outcome

The finished application classifies book genres from raw summaries and recommends personalized books through both a web search page and a chatbot conversation.
