import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  const { siteDescription } = props;

  return (
    <header>
      <h1 className="title">Christy La&nbsp;Guardia</h1>
      <p className="subtitle">{siteDescription}</p>
    </header>
  );
}

Header.propTypes = {
  siteDescription: PropTypes.string,
};
