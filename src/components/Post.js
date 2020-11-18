import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import PostNav from './PostNav';
import HeadingRenderer from './HeadingRenderer';
import ImageRenderer from './ImageRenderer';
import Contact from './Contact';
import formatDate from '../helpers/formatDate';

export default function Post(props) {
  const {
    // previousHref,
    // nextHref,
    slug,
    frontmatter: { title, subtitle, read_time, date },
    markdownBody,
  } = props;

  return (
    <div className="article">
      <h1 className="article-title">{title}</h1>
      {subtitle && <h2 className="article-subtitle">{subtitle}</h2>}
      <p>
        <small>
          {date && <span>{formatDate(date)}</span>}
          {date && read_time && <span> &#8226; </span>}
          {read_time && <span>{read_time} read</span>}
        </small>
      </p>
      <ReactMarkdown
        source={markdownBody}
        renderers={{
          heading: HeadingRenderer,
          image: ImageRenderer,
        }}
      />
      {/* <ReactMarkdown
        source={markdownBody}
        renderers={{
          heading: HeadingRenderer,
          // TODO: temporarily removing images
          // image: ImageRenderer,
          // paragraph: (props) => {
          //   const element = props.children[0];
          //   console.log(props)
          //   console.log(element?.type)
          //   // return element?.type === 'img' ? ImageRenderer(element?.props) : <p>{element}</p>;
          //   return element?.type === 'img' ? null : <p>{element}</p>;
          // },
        }}
      /> */}
      <Contact slug={slug} />
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
  }),
  markdownBody: PropTypes.string,
};
