import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Image from 'next/image';
import Layout from '../src/components/Layout';

export default function About({ person }) {
  const {
    fields: {
      image,
      shortBio,
      email,
      medium,
      facebook,
      instagram,
      twitter,
      linkedIn,
      portfolio,
    },
  } = person;

  const links = [
    { href: medium, name: 'Medium' },
    { href: facebook, name: 'Facebook' },
    { href: instagram, name: 'Instagram' },
    { href: twitter, name: 'Twitter' },
    { href: linkedIn, name: 'LinkedIn' },
  ];

  const renderImage = (image) => {
    const {
      fields: {
        title: imgTitle,
        file: {
          url,
          details: {
            image: { height, width },
          },
        },
      },
    } = image;

    return (
      <figure className="image-container">
        <Image
          src={`https:${url}`}
          alt={imgTitle}
          loading="lazy"
          layout="responsive"
          height={height}
          width={width}
        />
      </figure>
    );
  };

  return (
    <Layout>
      <section className="about">
        {renderImage(image)}
        <Markdown source={shortBio} escapeHtml={true} />
      </section>

      <section className="contact">
        <h3>Want to chat?</h3>
        <p>
          <span>
            Email is the best way to reach me, here&apos;s my email address:
          </span>
          <span> </span>
          <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
            {email}
          </a>
        </p>

        <p>You can also find me here:</p>

        {links.map(({ href, name }) => (
          <p key={name}>
            <a href={href} target="_blank" rel="noreferrer">
              {name}
            </a>
          </p>
        ))}

        <p>
          <span>Want to know even more about me?</span>
          <span> </span>
          <a href={portfolio} target="_blank" rel="noreferrer">
            Check out my portfolio.
          </a>
        </p>
      </section>
    </Layout>
  );
}

About.propTypes = {
  fields: PropTypes.shape({
    image: PropTypes.shape({
      fields: PropTypes.shape({
        tile: PropTypes.string,
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
    shortBio: PropTypes.string,
    email: PropTypes.string,
    medium: PropTypes.string,
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    twitter: PropTypes.string,
    linkedIn: PropTypes.string,
    portfolio: PropTypes.string,
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
