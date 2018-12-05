import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase/index';
import Layout from '../../containers/Layout/Layout';
import ProductFull from '../../containers/ProductFull/ProductFull.jsx';
import ProductsListWithTabs from '../ProductsListWithTabs/ProductsListWithTabs';

class App extends Component {
  state = {
    productLists: [
      { id: 'new-arrivals', title: 'New Arrivals' },
      { id: 'best-seller', title: 'Best Seller' },
      { id: 'most-popular', title: 'Most Popular' }
    ]
  };

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route
              path={ROUTES.LANDING}
              exact
              component={props => (
                <ProductsListWithTabs
                  lists={this.state.productLists}
                  {...props}
                />
              )}
            />
            <Route path={`${ROUTES.ITEM}/:id`} component={ProductFull} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withFirebase(App);
