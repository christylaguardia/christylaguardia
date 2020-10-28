import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';

Layout.propTypes = {
  pageTitle: PropTypes.string,
  showHeader: PropTypes.bool,
  showNav: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default function Layout({
  pageTitle,
  showHeader = true,
  showNav = false,
  children,
}) {
  const siteTitle = 'Christy La Guardia';
  const siteDescription = 'Tales from my life as a Jehovah Witness';
  const title = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle;

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="description" content={siteDescription} />
        <meta name="author" content={siteTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      {showHeader && (
        <header>
          <h1 className="text-xl no-bottom-margin">{siteTitle}</h1>
          <p className="text-md text-uppercase no-top-margin">
            {siteDescription}
          </p>
          <hr />
        </header>
      )}
      {showNav && (
        <nav>
          <ul>
            <li>
              <Link href={{ pathname: '/' }}>
                <a>&larr; Home</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <main>{children}</main>
      <footer>
        <p>
          <span>&copy; 2020 </span>
          <a
            href="https://christylaguardia.github.io/"
            target="_blank"
            rel="noreferrer"
          >
            Christy La Guardia
          </a>
          <span> | </span>
          <a
            href="https://twitter.com/christylga"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <span> | </span>
          <a
            href="https://medium.com/@christylaguardia"
            target="_blank"
            rel="noreferrer"
          >
            Medium
          </a>
        </p>
      </footer>
    </>
  );
}
