import React from 'react';
import PropTypes from 'prop-types';
import css from './Footer.module.css';
import Link from 'next/link';

export default function Footer(props) {
  const { siteTitle } = props;
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <p className={css.text}>
        <span>&copy; {year} </span>
        <Link href="/contact">
          <span>{siteTitle}</span>
        </Link>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
};
