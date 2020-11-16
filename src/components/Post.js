import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Navigation from './Navigation';
import HeadingRenderer from './HeadingRenderer';
import ImageRenderer from './ImageRenderer';
import Contact from './Contact';

export default function Post(props) {
  const {
    previousHref,
    nextHref,
    frontmatter: { title, subtitle, read_time, date },
    markdownBody,
  } = props;

  return (
    <>
      <Navigation previousHref={previousHref} nextHref={nextHref} />
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
          renderers={{
            heading: HeadingRenderer,
            // TODO: temporarily removing images
            // image: ImageRenderer,
            paragraph: (props) => {
              const element = props.children[0];
              console.log(props)
              console.log(element?.type)
              // return element?.type === 'img' ? ImageRenderer(element?.props) : <p>{element}</p>;
              return element?.type === 'img' ? null : <p>{element}</p>;
            },
          }}
        />
        <hr />
        <Navigation previousHref={previousHref} nextHref={nextHref} />
        <Contact />
      </article>
    </>
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
