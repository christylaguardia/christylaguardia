import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';

export default function Home(props) {
  const {
    page: {
      fields: { title, body },
    },
  } = props;

  return (
    <Layout pageTitle={title}>
      <section className="page">
        <Markdown source={body} escapeHtml={true} />
      </section>
    </Layout>
  );
}

Home.propTypes = {
  page: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
  }),
};

export async function getStaticProps() {
  // Create an instance of the Contentful JavaScript SDK
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch a single entry
  const page = await client.getEntry('2DhHAgxs0TQ4fvDFC6w8Fs');

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!page) {
    return { props: {} };
  }

  return {
    props: {
      page,
    },
  };
}
