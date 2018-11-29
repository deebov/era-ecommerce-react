import React, { Component } from 'react';

import ProductSummary from '../../components/ProductSummary/ProductSummary';

class ProductFull extends Component {
  render() {
    return (
      <div>
        <ProductSummary product={this.props.product} />
      </div>
    );
  }
}

export default ProductFull;