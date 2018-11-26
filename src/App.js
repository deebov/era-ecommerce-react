import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
import ProductsList from './containers/ProductsList/ProductsList';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ProductsList />
        </Layout>
      </div>
    );
  }
}

export default App;
