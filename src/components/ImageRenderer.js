import React from 'react';
import PropTypes from 'prop-types';

export default function ImageRenderer(props) {
  return React.createElement('img', {
    loading: 'lazy',
    src: props.src,
    alt: props.alt,
  });
}

ImageRenderer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
