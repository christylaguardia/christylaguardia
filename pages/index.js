import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';
import { fetchByEntry } from '../src/helpers/contentful';

export default function About(props) {
  const {
    entry: {
      fields: { title, body },
    },
  } = props;

  return (
    <Layout pageTitle={title}>
      <section>
        <Markdown>{body}</Markdown>
      </section>
    </Layout>
  );
}

About.propTypes = {
  entry: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
  }),
};

export async function getStaticProps() {
  return fetchByEntry('F7FPpVESEOCwx6JznVyKt'); // "Home" Page
}
