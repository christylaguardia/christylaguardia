import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import HeadingRenderer from './HeadingRenderer';
import ImageRenderer from './ImageRenderer';
import Share from './Share';
import formatDate from '../helpers/formatDate';

export default function Post(props) {
  const {
    date,
    frontmatter: { title, subtitle, read_time },
    markdownBody,
  } = props;

  return (
    <>
      <div className="article">
        <h1 className="article-title">{title}</h1>
        {subtitle && <h2 className="article-subtitle">{subtitle}</h2>}
        {(date || read_time) && (
          <p>
            <small>
              {/* TODO: use date from file name */}
              {date && <span>{formatDate(date)}</span>}
              {date && read_time && <span> &#8226; </span>}
              {read_time && <span>{read_time} read</span>}
            </small>
          </p>
        )}
        <ReactMarkdown
          source={markdownBody}
          renderers={{
            heading: HeadingRenderer,
            image: ImageRenderer,
            // TODO: fix the error "Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>."
            // paragraph: (paragraphProps) => {
            //   const element = paragraphProps.children[0];
            //   return element?.type === 'img' ? (
            //     ImageRenderer({
            //       src: element?.props?.src,
            //       alt: element?.props?.alt,
            //     })
            //   ) : (
            //     <p>{element}</p>
            //   );
            // },
          }}
        />
      </div>
      <Share title={title} />
    </>
  );
}

Post.propTypes = {
  previousHref: PropTypes.string,
  nextHref: PropTypes.string,
  date: PropTypes.string,
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    read_time: PropTypes.string,
  }),
  markdownBody: PropTypes.string,
};
