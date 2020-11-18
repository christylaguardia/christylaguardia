import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function TopNav(props) {
  return (
    <nav>
      <ul className="top-nav">
        <li className="top-nav-item">
          <Link href={{ pathname: '/' }}>
            <a>Christy La&nbsp;Guardia</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href={{ pathname: '/' }}>
            <a>Blog</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href={{ pathname: '/about' }}>
            <a>About</a>
          </Link>
        </li>
        <li className="top-nav-item">
          <Link href={{ pathname: '/contact' }}>
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

TopNav.propTypes = {
  previousHref: PropTypes.string,
  nextHref: PropTypes.string,
};
