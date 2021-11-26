import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';

export default function PageSlug(props) {
  const { page } = props;

  if (page === 'undefined' || !page) {
    return <p>Uh Oh! Something went wrong :(</p>;
  }
  const {
    fields: { title, body },
  } = page;

  return (
    <Layout pageTitle={title}>
      <section className="page">
        <Markdown source={body} escapeHtml={true} />
      </section>
    </Layout>
  );
}

PageSlug.propTypes = {
  page: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  }),
};

export async function getStaticProps(context) {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch all results where `fields.slug` is equal to the `slug` param
  const result = await client
    .getEntries({
      content_type: 'page',
      'fields.slug': context.params.slug,
    })
    .then((response) => response.items);

  // Since `slug` was set to be a unique field, we can be confident that
  // the only result in the query is the correct page.
  const page = result.pop();

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!page) {
    return { props: {} };
  }

  // Return the page as props
  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Query Contentful for all pages in the space
  const pages = await client
    .getEntries({ content_type: 'page' })
    .then((response) => response.items);

  // Map the result of that query to a list of slugs.
  // This will give Next the list of all page pages that need to be
  // rendered at build time.
  const paths = pages.map(({ fields: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
