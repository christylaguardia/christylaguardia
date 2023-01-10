import React from 'react';
import PropTypes from 'prop-types';
import Head from './Head';

export const siteInfo = {
  siteTitle: 'Christy La Guardia',
  siteDescription:
    'Stories of survival, escape and recovery from the Jehovah Witness cult.',
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
      <main className="main">{children}</main>
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
