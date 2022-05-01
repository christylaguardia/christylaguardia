import React from 'react';
import PropTypes from 'prop-types';

export default function Footer(props) {
  const { siteTitle } = props;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        <span>&copy; {year} </span>
        <span>{siteTitle}</span>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
};
