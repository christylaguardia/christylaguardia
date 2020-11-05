import React from 'react';
import PropTypes from 'prop-types';

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

export default function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children);
  const text = props.children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + props.level, { id: slug }, children);
}

HeadingRenderer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  level: PropTypes.number.isRequired,
};
