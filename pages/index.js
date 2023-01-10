import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';
import { fetchByEntry } from '../src/helpers/contentful';

export default function Home(props) {
  const {
    entry: {
      fields: {
        title,
        body,
      },
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
      image: PropTypes.shape({
        fields: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          file: PropTypes.shape({
            url: PropTypes.string,
            details: PropTypes.shape({
              image: PropTypes.shape({
                height: PropTypes.number,
                width: PropTypes.number,
              }),
            }),
          }),
        }),
      }),
    }),
  }),
};

export async function getStaticProps() {
  return fetchByEntry('F7FPpVESEOCwx6JznVyKt');
}
