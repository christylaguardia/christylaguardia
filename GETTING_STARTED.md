# Christy La Guardia's Portfolio

## [Production](https://christylaguardia.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), serving up content from [Contentful](https://github.com/contentful/contentful.js) and hosted on [vercel](https://vercel.com/).

## Getting Started

Create a `.env.local` with the following variables:

```txt
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=
NEXT_PUBLIC_FORMSPREE=
```

Run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Dynamic Pages

New pages can be added as in [Contentful](https://be.contentful.com/login).

Field | Type
-- | --
Title | Short text
Slug | Short text
Body | Long text (markdown)
