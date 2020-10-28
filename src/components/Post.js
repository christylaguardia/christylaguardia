import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import HeadingRenderer from './HeadingRenderer';
import ImageRenderer from './ImageRenderer';

Post.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    date: PropTypes.string,
  }),
  markdownBody: PropTypes.string.isRequired,
};

export default function Post({ frontmatter, markdownBody }) {
  const { title, subtitle, date } = frontmatter;

  return (
    <article>
      {date && <p>{date}</p>}
      <h1 className="text-lg no-top-margin no-bottom-margin">{title}</h1>
      {subtitle && <p className="text-italic no-top-margin">{subtitle}</p>}
      <ReactMarkdown
        source={markdownBody}
        renderers={{ heading: HeadingRenderer, image: ImageRenderer }}
      />
    </article>
  );
}
