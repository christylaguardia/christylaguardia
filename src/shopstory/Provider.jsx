import React from 'react';
import PropTypes from 'prop-types';
import { ShopstoryProvider } from '@shopstory/react';

export const DemoShopstoryProvider = ({ children }) => {
  return <ShopstoryProvider>{children}</ShopstoryProvider>;
};

DemoShopstoryProvider.propTypes = {
  children: PropTypes.node,
};
