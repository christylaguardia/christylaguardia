import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';

export default function Head(props) {
  const { title, siteTitle, siteDescription } = props;

  return (
    <NextHead>
      <meta charset="UTF-8" />
      <meta name="description" content={siteDescription} />
      <meta name="author" content={siteTitle} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
};
