import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        data: PropTypes.string,
        excerpt: PropTypes.string,
      }),
      slug: PropTypes.string.isRequired,
    })
  ),
};

export default function PostList({ posts }) {
  if (posts === 'undefined') return null;
  if (!posts) return <div>No posts!</div>;

  return posts.map(
    ({ frontmatter: { title, subtitle, date, excerpt }, slug }) => (
      <div key={slug}>
        {date && <p>{date}</p>}
        <h2 className="no-bottom-margin">{title}</h2>
        {subtitle && <h3 className="text-italic no-top-margin">{subtitle}</h3>}
        {excerpt && <p>{excerpt}</p>}
        <Link href={{ pathname: `/${slug}` }}>
          <a>Read More</a>
        </Link>
        <hr />
      </div>
    )
  );
}
