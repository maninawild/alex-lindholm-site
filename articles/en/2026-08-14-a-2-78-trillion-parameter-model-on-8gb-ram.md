---
title: "A 2.78 trillion parameter model just ran on 8 GB of RAM"
slug: "2026-08-14-a-2-78-trillion-parameter-model-on-8gb-ram"
date: "2026-08-14T09:00:00.000Z"
tags: ["Human-Centered AI", "Innovation", "Venture Building"]
category: "Human-Centered AI"
language: "en"
contentSource: "original_en"
source: "LinkedIn"
sourceUrl: "https://www.linkedin.com/in/axlindholm/"
metaDescription: "A tiny C implementation running a trillion-parameter model on 8 GB of RAM is a useful lesson in questioning inherited constraints."
relatedArticles: []
---

That’s amazing, fellas! A 2.78 trillion parameter model just ran on 8 GB of RAM. No GPU!

The project is kimi-k3-in-c - 176 KB of plain C, no CUDA, no BLAS, streaming the model’s experts straight from disk instead of loading everything into memory at once. Same exact output whether you give it 8 GB or 224 GB, the only difference is the speed. It is slow on a cold cache, and the author is upfront that this is a reference build, not something you would put into production. The demonstration lands anyway, so not to bother…

For years the assumption stayed simple: bigger model, bigger GPU, no way around it. Turns out the constraint was never the model. It was the habit of assuming every parameter needs to sit in fast memory at the same time. Once someone questions that habit, an 8 GB laptop starts looking like a research machine.

I see the same pattern (or should I call it mistake?) outside of infrastructure. Founders inherit a constraint nobody has re-checked in years - “we need this headcount,” “we need this budget,” “we need this stack” - and build an entire roadmap on top of an assumption instead of a measurement. Revolution is happening.

Worth asking, before the next infrastructure decision, which constraint is real and which one is just inherited.