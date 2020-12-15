import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Layout from '../src/components/Layout';
import HeroImage from '../src/components/HeroImage';

export default function About(props) {
  const {
    person: {
      fields: { image, shortBio },
    },
  } = props;

  return (
    <Layout>
      <section className="about">
        <HeroImage image={image} />
        <Markdown source={shortBio} escapeHtml={true} />
      </section>
    </Layout>
  );
}

About.propTypes = {
  person: PropTypes.shape({
    fields: PropTypes.shape({
      image: PropTypes.object,
      shortBio: PropTypes.string,
      email: PropTypes.string,
      medium: PropTypes.string,
      facebook: PropTypes.string,
      instagram: PropTypes.string,
      twitter: PropTypes.string,
      linkedIn: PropTypes.string,
      portfolio: PropTypes.string,
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
  const person = await client.getEntry('2G14O8KXqIg2Nt3x7qe7Z5');

  // If nothing was found, return an empty object for props, or else there would
  // be an error when Next tries to serialize an `undefined` value to JSON.
  if (!person) {
    return { props: {} };
  }

  return {
    props: {
      person,
    },
  };
}
