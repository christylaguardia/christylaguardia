# Christy La Guardia's Blog

## [Production](https://christylaguardia.com/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), hosted on [vercel](https://vercel.com/).

## Getting Started

Create a `.env.local` with the following variables:

```txt
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=
```

Run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Blog Posts

New posts can be added as in Contentful.

### Read time

Use [Read-O-Meter](https://niram.org/read/) to get the value for the `readTime` field.

## References

* https://heymike.dev/post/build-a-static-blog-with-next-js-and-contentful-part-two-next-js
* https://www.netlify.com/blog/2020/08/17/integrate-next.js-contentful/