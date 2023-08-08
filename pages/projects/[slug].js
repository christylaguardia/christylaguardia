import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Markdown from 'react-markdown';
import Layout from '../../src/components/Layout';
import formatDate from '../../src/helpers/formatDate';
import {
  fetchByContentType,
  fetchPathsByContentType,
} from '../../src/helpers/contentful';

export default function ProjectSlug(props) {
  const { entries } = props;

  // TODO: how to do this in getStaticProps?
  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct entry.
  const project = entries[0];

  if (project === 'undefined' || !project) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }
  const {
    fields: { title, description, startDate, body, techStack: tags },
  } = project;

  return (
    <Layout pageTitle={title}>
      <div className="header">
        <Link href="/projects">
          <span>&larr; Projects</span>
        </Link>
        <Link href="/contact">
          <span>Christy La&nbsp;Guardia</span>
        </Link>
      </div>
      <section className="article">
        <h2>{title}</h2>
        <h3>{description}</h3>
        <p>
          <small>{formatDate(startDate, 'monthyear')}</small>
        </p>
        <Markdown>{body}</Markdown>
        {tags && (
          <div className="tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

ProjectSlug.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
    }),
  ),
};

export async function getStaticProps(context) {
  return fetchByContentType('project', {
    'fields.slug': context.params.slug,
  });
}

export async function getStaticPaths() {
  return fetchPathsByContentType('project', { order: '-fields.startDate' });
}
