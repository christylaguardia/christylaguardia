import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import HeadingRenderer from './HeadingRenderer';
import ImageRenderer from './ImageRenderer';

export default function Post(props) {
  const {
    frontmatter: { title, subtitle, read_time, date },
    markdownBody,
  } = props;

  return (
    <article>
      <h1 className="article-title">{title}</h1>
      {subtitle && <h2 className="article-subtitle">{subtitle}</h2>}
      <p className="margin-bottom-0">
        <small>
          {date && <span>{date}</span>}
          {date && read_time && <span> &#8226; </span>}
          {read_time && <span>{read_time} read</span>}
        </small>
      </p>
      <ReactMarkdown
        source={markdownBody}
        renderers={{ heading: HeadingRenderer, image: ImageRenderer }}
      />
    </article>
  );
}

Post.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    date: PropTypes.string,
  }),
  markdownBody: PropTypes.string,
};
