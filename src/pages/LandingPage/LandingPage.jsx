import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ProductsListWithTabs from '../../components/ProductsListWithTabs/ProductsListWithTabs';

class LandingPage extends Component {
  state = {
    productLists: [
      { id: 'new-arrivals', title: 'New Arrivals' },
      { id: 'best-seller', title: 'Best Seller' },
      { id: 'most-popular', title: 'Most Popular' }
    ],
    error: false
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Welcome 🖖</title>
        </Helmet>
        <ProductsListWithTabs lists={this.state.productLists} />
      </div>
    );
  }
}

export default LandingPage;
