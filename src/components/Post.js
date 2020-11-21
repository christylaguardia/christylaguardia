import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import HeadingRenderer from './HeadingRenderer';
import ImageRenderer from './ImageRenderer';
import Share from './Share';
import formatDate from '../helpers/formatDate';

export default function Post(props) {
  const {
    frontmatter: { title, subtitle, read_time, date },
    markdownBody,
  } = props;

  return (
    <div className="article">
      <h1 className="article-title">{title}</h1>
      {subtitle && <h2 className="article-subtitle">{subtitle}</h2>}
      {date ||
        (read_time && (
          <p>
            <small>
              {/* TODO: use date from file name */}
              {date && <span>{formatDate(date)}</span>}
              {date && read_time && <span> &#8226; </span>}
              {read_time && <span>{read_time} read</span>}
            </small>
          </p>
        ))}
      <ReactMarkdown
        source={markdownBody}
        renderers={{
          heading: HeadingRenderer,
          image: ImageRenderer,
          paragraph: (paragraphProps) => {
            const element = paragraphProps.children[0];
            return element?.type === 'img' ? (
              // TODO: fix the error "Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>."
              ImageRenderer({
                src: element?.props?.src,
                alt: element?.props?.alt,
              })
            ) : (
              <p>{element}</p>
            );
          },
        }}
      />
      <Share />
    </div>
  );
}

Post.propTypes = {
  previousHref: PropTypes.string,
  nextHref: PropTypes.string,
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    date: PropTypes.string,
    read_time: PropTypes.string,
  }),
  markdownBody: PropTypes.string,
};
