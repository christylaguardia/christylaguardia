import React from 'react';
import PropTypes from 'prop-types';

export default function Footer(props) {
  const { siteTitle } = props;

  return (
    <footer className="footer">
      <p>
        <span>&copy; 2020 </span>
        <span>{siteTitle}</span>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
};
