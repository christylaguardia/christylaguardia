import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';
import {
  fetchByContentType,
  fetchPathsByContentType,
} from '../src/helpers/contentful';

export default function PageSlug(props) {
  const { entries } = props;

  // TODO: how to do this in getStaticProps?
  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct entry.
  const page = entries[0];

  if (page === 'undefined' || !page) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }

  const {
    fields: { title, body },
  } = page;

  return (
    <Layout pageTitle={title}>
      <Link href="/">
        <span>&larr; Home</span>
      </Link>
      <section className="page">
        <Markdown>{body}</Markdown>
      </section>
    </Layout>
  );
}

PageSlug.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
      }),
    })
  ),
};

export async function getStaticProps(context) {
  return fetchByContentType('page', {
    'fields.slug': context.params.slug,
  });
}

export async function getStaticPaths() {
  return fetchPathsByContentType('page');
}
