import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function PostItem(props) {
  const {
    frontmatter: { title, subtitle, read_time, date },
    slug,
  } = props;

  return (
    <Link href={{ pathname: `/${slug}` }}>
      <article className="divider fade-in">
        <h2 className="margin-top-0 margin-bottom-0">
          <Link href={{ pathname: `/${slug}` }}>
            <a>{title}</a>
          </Link>
        </h2>
        {subtitle && <p className="margin-top-0 margin-bottom-0">{subtitle}</p>}
        <p className="margin-bottom-0">
          <small>
            {date && <span>{date}</span>}
            {date && read_time && <span> &#8226; </span>}
            {read_time && <span>{read_time} read</span>}
          </small>
        </p>
      </article>
    </Link>
  );
}

PostItem.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    date: PropTypes.string,
  }),
  slug: PropTypes.string,
};
