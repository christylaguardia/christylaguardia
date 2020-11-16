import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function ImageRenderer(props) {
  const { src, alt } = props;

  if (!src || !alt) return null;

  return (
    <Image
      className="image"
      src={src}
      alt={alt}
      loading="lazy"
      height={400}
      width={700}
    />
  );
}

ImageRenderer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
