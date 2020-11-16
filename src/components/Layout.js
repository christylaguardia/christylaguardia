import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';

export const siteInfo = {
  siteTitle: 'Christy La Guardia',
  siteDescription:
    'Stories of survival, escape and recovery from the Jehovah Witness cult.',
};

export default function Layout(props) {
  const { pageTitle, showHeader = true, children } = props;
  const { siteTitle, siteDescription } = siteInfo;
  const title = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle;

  return (
    <>
      <Head
        title={title}
        siteTitle={siteTitle}
        siteDescription={siteDescription}
      />
      {showHeader && <Header siteDescription={siteDescription} />}
      <main>{children}</main>
      <Footer siteTitle={siteTitle} />
    </>
  );
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  showHeader: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
