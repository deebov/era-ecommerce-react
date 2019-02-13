import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../../../store/actions';

import PreloadLink from '../PreloadLink';

const Product = ({ id, onFetchProduct, ...props }) => {
  return <PreloadLink waiting={() => onFetchProduct(id)} {...props} />;
};

const mapDispatchToProps = dispatch => ({
  onFetchProduct: id => dispatch(fetchProduct(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Product);
