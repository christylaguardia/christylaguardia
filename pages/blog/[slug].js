import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import formatDate from '../../src/helpers/formatDate';
import Layout from '../../src/components/Layout';
import HeroImage from '../../src/components/HeroImage';
import Share from '../../src/components/Share';
import { fetchByContentType, fetchPathsByContentType } from '../_contenful';

export default function BlogSlug(props) {
  const { entries } = props;

  // TODO: how to do this in getStaticProps?
  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct entry.
  const post = entries[0];

  if (post === 'undefined' || !post) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }
  const {
    fields: { title, publishDate: date, readTime, body, heroImage },
  } = post;

  return (
    <Layout pageTitle={title}>
      <article className="article">
        <h1 className="article-title">{title}</h1>
        {(date || readTime) && (
          <p>
            <small>
              {date && <span>{formatDate(date)}</span>}
              {date && readTime && <span> &#8226; </span>}
              {readTime && <span>{readTime} min read</span>}
            </small>
          </p>
        )}
        {heroImage && <HeroImage image={heroImage} />}
        <section>
          <Markdown source={body} escapeHtml={true} />
        </section>
      </article>
      <Share title={title} />
    </Layout>
  );
}

BlogSlug.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        publishDate: PropTypes.string,
        readTime: PropTypes.number,
        body: PropTypes.string,
        heroImage: PropTypes.object,
      }),
    })
  ),
};

export async function getStaticProps(context) {
  return fetchByContentType('blogPost', {
    'fields.slug': context.params.slug,
  });
}

export async function getStaticPaths() {
  return fetchPathsByContentType('blogPost');
}
