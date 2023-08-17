import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';
import {
  fetchByContentType,
  fetchPathsByContentType,
} from '../src/helpers/contentful';

export default function GenericPage(props) {
  const { entries } = props;

  // TODO: how to do this in getStaticProps?
  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct entry.
  const page = entries[0];

  if (page === 'undefined' || !page) {
    return (
      <Layout pageTitle={title}>
        <p>Uh Oh! Something went wrong :(</p>
      </Layout>
    );
  }

  const {
    fields: { title, body },
  } = page;

  return (
    <Layout pageTitle={title}>
      <section>
        <Markdown>{body}</Markdown>
      </section>
    </Layout>
  );
}

GenericPage.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
      }),
    }),
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
