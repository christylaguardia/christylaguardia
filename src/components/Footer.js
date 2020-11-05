import React from 'react';
import PropTypes from 'prop-types';

export default function Footer(props) {
  const { siteTitle } = props;

  return (
    <footer className="footer">
      <p>
        <span>&copy; 2020 </span>
        <a
          href="https://christylaguardia.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          {siteTitle}
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
  );
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
};
