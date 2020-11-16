import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Navigation(props) {
  const { previousHref, nextHref } = props;

  return (
    <nav>
      <ul>
        {previousHref ? (
          <li>
            <Link href={{ pathname: previousHref }}>
              <a>&#8592; Previous</a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href={{ pathname: '/' }}>
              <a>&#8592; Home</a>
            </Link>
          </li>
        )}
        {nextHref && (
          <li>
            <Link href={{ pathname: nextHref }}>
              <a>Next &#8594;</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  previousHref: PropTypes.string,
  nextHref: PropTypes.string,
};
