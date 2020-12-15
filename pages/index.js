import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import sortPostsByYear from '../src/helpers/sortPostsByYear';
import formatDate from '../src/helpers/formatDate';

export default function Index({ posts }) {
  if (posts === 'undefined' || !posts) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  const postsByYear = sortPostsByYear(posts);
  const years = Object.keys(postsByYear).reverse();

  return (
    <Layout className="blog-section">
      {years.map((year) => (
        <section key={year}>
          <h2 className="blog-year">{year}</h2>
          <ul className="blog-list">
            {postsByYear[year].map(
              ({ fields: { slug, title, publishDate } }) => (
                <li key={slug} className="blog-list-item">
                  <Link href={{ pathname: `/blog/${slug}` }}>
                    <a href={`https://christylaguardia.com/blog/${slug}`}>
                      {title}
                    </a>
                  </Link>
                  <span>{formatDate(publishDate)}</span>
                  {/* TODO: */}
                  {/* <span>{readTime} min read</span> */}
                </li>
              )
            )}
          </ul>
        </section>
      ))}
    </Layout>
  );
}

Index.propTypes = {
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

  // Fetch all entries of content_type `blogPost`
  const posts = await client
    .getEntries({ content_type: 'blogPost' })
    .then((response) => response.items);

  return {
    props: {
      posts,
    },
  };
}
