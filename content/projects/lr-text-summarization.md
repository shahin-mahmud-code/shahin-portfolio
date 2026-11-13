---
title: AI text summarization for labour-relations documents
summary: A research pilot on making AI summaries of labour-relations decisions keep the legal terms that matter, by combining domain-term weighting with transformer models.
category: university
period: March – December 2022
role: Research Analyst (volunteer)
organization: University of Ottawa, in collaboration with Treasury Board Secretariat – Ontario
stack:
  - Python
  - Google Colab
  - NLTK
  - spaCy
  - Gensim
  - Hugging Face Transformers
  - BERT
  - BART
  - Pegasus
  - T5
  - Seq2Seq
  - Pandas
  - NumPy
  - Matplotlib
  - Seaborn
outcome: Showed better retention of domain terms and better summary quality on labour-relations documents by weighting those terms inside transformer-based summarization pipelines.
order: 2
draft: false
approval: not-applicable
---

## Problem

Generic text-summarization models often miss or distort domain-specific legal and collective-bargaining terminology. That is a real problem when the documents are long labour-relations case files and arbitration decisions, because a summary that drops or rewords the key terms can change the meaning.

This was a pilot project for Treasury Board Secretariat – Ontario, carried out as a student research project through the University of Ottawa. The question was whether focusing a summarizer on labour-relations (LR) terms would make it more efficient and more accurate.

## My role

I was a Research Analyst (volunteer) on a team of graduate students, working with advisors from the Secretariat. I ran the experiments and the analysis in Python.

## What I did

- Ran research experiments in Python on Google Colab to improve the efficiency and accuracy of both extractive and abstractive AI summarization by focusing on domain-specific LR terms.
- Pre-processed the legal text corpora with tokenization, stop-word removal, lemmatization, part-of-speech tagging and domain keyword weighting, using NLTK, spaCy and Gensim.
- Evaluated and compared frequency-based extractive summarization against deep-learning models from Hugging Face: BERT, BART, Pegasus, T5 and Seq2Seq architectures.
- Built data visualizations in Python with Matplotlib and Seaborn to compare the models on ROUGE scores, compression ratios and how many LR keywords each summary kept.

## Outcome

Integrating LR term weighting with transformer-based summarization pipelines improved both the retention of domain keywords and the quality of the summaries on labour-relations documents.
