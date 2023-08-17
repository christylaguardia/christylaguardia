import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function HeroImage(props) {
  const {
    image: {
      fields: {
        title,
        description,
        file: {
          url,
          details: {
            image: { height, width },
          },
        },
      },
    },
  } = props;

  return (
    <figure className="image-container">
      <Image
        src={`https:${url}`}
        alt={title}
        loading="lazy"
        layout="responsive"
        height={height}
        width={width}
      />
      {description && <figcaption>{description}</figcaption>}
    </figure>
  );
}

HeroImage.propTypes = {
  image: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      file: PropTypes.shape({
        url: PropTypes.string,
        details: PropTypes.shape({
          image: PropTypes.shape({
            height: PropTypes.number,
            width: PropTypes.number,
          }),
        }),
      }),
    }),
  }),
};
