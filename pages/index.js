import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';
import { fetchByEntry } from '../src/helpers/contentful';

export default function Home(props) {
  const {
    entry: {
      fields: { title, body },
    },
  } = props;

  return (
    <Layout pageTitle={title}>
      <section className="page">
        <Markdown children={body} />
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
  return fetchByEntry('2DhHAgxs0TQ4fvDFC6w8Fs');
}
