# Christy La Guardia's Blog

## [Production](https://christylaguardia.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), hosted on [vercel](https://vercel.com/).

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Posts

New posts can be added as markdown files in the `/posts` folder. Files prefixed with `DRAFT_` won't appear on the homepage.

### Template

File name: `YYYY-MM-DD_Title-Separated-By-Dashes.md`

```md
---
title: 'Title of Article'
subtitle: 'Optional subtitle for this article.'
read_time: 'X min'
---

![Image Alt Text](/image=name.png=HeightxWidth)
_Image Caption._

Article body goes here...
```

Use [Read-O-Meter](https://niram.org/read/) to get the `read_time`.