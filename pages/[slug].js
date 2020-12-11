import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Image from 'next/image'
import formatDate from '../src/helpers/formatDate';
import Layout from '../src/components/Layout';
import Share from '../src/components/Share';

export default function Slug({ post }) {
  if (post === 'undefined' || !post) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }
  const {
    fields: { title, publishDate: date, readTime, body, heroImage },
  } = post;

  const renderImage = (heroImage) => {
    const {
      fields: {
        title,
        description,
        file: {
          url,
          details: {
            image: { height, width },
          },
        },
      },
    } = heroImage;

    return (
      <figure className="image-container">
        <Image
          src={`https:${url}`}
          alt={title}
          loading="lazy"
          layout="responsive"
          height={height}
          width={width}
        />
        <figcaption>{description}</figcaption>
      </figure>
    );
  };

  return (
    <Layout pageTitle={title}>
      <article className="article">
        <h1 className="article-title">{title}</h1>
        {(date || readTime) && (
          <p>
            <small>
              {date && <span>{formatDate(date)}</span>}
              {date && readTime && <span> &#8226; </span>}
              {readTime && <span>{readTime} min read</span>}
            </small>
          </p>
        )}
        {heroImage && renderImage(heroImage)}
        <section>
          <Markdown source={body} escapeHtml={true} />
        </section>
      </article>
      <Share title={title} />
    </Layout>
  );
}

Slug.propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string,
      publishDate: PropTypes.string,
    }),
  }),
};

export async function getStaticProps(context) {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch all results where `fields.slug` is equal to the `slug` param
  const result = await client
    .getEntries({
      content_type: 'blogPost',
      'fields.slug': context.params.slug,
    })
    .then((response) => response.items);

  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct post.
  const post = result.pop();

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!post) {
    return { props: {} };
  }

  // Return the post as props
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Query Contentful for all blog posts in the space
  const posts = await client
    .getEntries({ content_type: 'blogPost' })
    .then((response) => response.items);

  // Map the result of that query to a list of slugs.
  // This will give Next the list of all blog post pages that need to be
  // rendered at build time.
  const paths = posts.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
