import React from 'react';
import PropTypes from 'prop-types';
import Head from './Head';
import Footer from './Footer';
import Header from './Header';

export const siteInfo = {
  siteTitle: 'Christy La Guardia',
  siteDescription: 'Christy La Guardia | Senior Software Engineer and Mentor',
};

export default function Layout(props) {
  const { pageTitle, children } = props;
  const { siteTitle, siteDescription } = siteInfo;
  const title = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle;

  return (
    <>
      <Head
        title={title}
        siteTitle={siteTitle}
        siteDescription={siteDescription}
      />
      <Header />
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
