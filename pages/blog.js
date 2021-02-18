import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import Subscribe from '../src/components/Subscribe';

export default function Blog({ posts }) {
  if (posts === 'undefined' || !posts) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  const postsByYear = posts.reduce((postsByYear, post) => {
    // Draft posts don't have a publish date
    if (!post.fields.publishDate) return postsByYear; // TDDO: can add to query?

    const year = parseInt(post.fields.publishDate.substring(0, 4), 10);

    if (Object.prototype.hasOwnProperty.call(postsByYear, year)) {
      postsByYear[year].push(post);
    } else {
      postsByYear[year] = [post];
    }

    return postsByYear;
  }, {});
  const years = Object.keys(postsByYear).reverse();

  const renderPost = ({
    fields: { slug, title, description, publishDate, readTime },
  }) => (
    <li key={slug} className="blog-list-item">
      <div className="blog-list-item-container">
        <Link href={{ pathname: `/blog/${slug}` }}>
          <a href={`/blog/${slug}`}>{title}</a>
        </Link>
        {description && <p>{description}</p>}
      </div>
      <small>{publishDate && <span>{`${readTime} min read`}</span>}</small>
    </li>
  );

  return (
    <Layout pageTitle="Blog">
      <Subscribe />
      {years.map((year) => (
        <section key={year}>
          <h2 className="blog-year">{year}</h2>
          <ul className="blog-list">
            {postsByYear[year].map((post) => renderPost(post))}
          </ul>
        </section>
      ))}
    </Layout>
  );
}

Blog.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        publishDate: PropTypes.string,
      }),
    })
  ),
};

export async function getStaticProps() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch all entries of content_type
  const posts = await client
    .getEntries({ content_type: 'blogPost', order: '-fields.publishDate' })
    .then((response) => response.items);

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!posts) {
    return { props: {} };
  }

  return {
    props: {
      posts,
    },
  };
}
