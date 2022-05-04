import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../src/components/Layout';
import { fetchByContentType } from '../src/helpers/contentful';

export default function Blog(props) {
  const { entries: posts } = props;

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
      <div className="blog-list-item-title">
        <Link href={{ pathname: `/blog/${slug}` }}>
          <a href={`/blog/${slug}`}>{title}</a>
        </Link>
        {description && <p>{description}</p>}
      </div>
      <div className="blog-list-item-small">
        <small>{publishDate && <span>{`${readTime} min read`}</span>}</small>
      </div>
    </li>
  );

  return (
    <Layout pageTitle="Blog">
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
  entries: PropTypes.arrayOf(
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
  return fetchByContentType('blogPost', { order: '-fields.publishDate' });
}
