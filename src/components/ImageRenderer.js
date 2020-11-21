import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function ImageRenderer(props) {
  const { src, alt } = props;

  if (!src || !alt) return null;
  const [imgSrc, size] = src.split('=');
  const [height, width] = size ? size.split('x') : [];

  return (
    <div className="image-container">
      <Image
        src={imgSrc}
        alt={alt}
        loading="lazy"
        layout="responsive"
        height={height || 700}
        width={width || 700}
      />
    </div>
  );
}

ImageRenderer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
