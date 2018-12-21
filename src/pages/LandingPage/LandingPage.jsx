import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ProductsListWithTabs from '../../components/ProductsListWithTabs/ProductsListWithTabs';
import { LANDING as landingTitle } from '../../constants/titles';

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
          <title>{landingTitle}</title>
        </Helmet>
        <ProductsListWithTabs lists={this.state.productLists} />
      </div>
    );
  }
}

export default LandingPage;
