import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase/index';
import Layout from '../../containers/Layout/Layout';
import ProductsListWithTabs from '../ProductsListWithTabs/ProductsListWithTabs';
import ProductFull from '../../containers/ProductFull/ProductFull.jsx';
import CartFull from '../../containers/CartFull/CartFull';
import WishlistFull from '../../containers/WishlistFull/WishlistFull';

class App extends Component {
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
        <Layout cartCount={this.state.cartCount}>
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
            <Route path={ROUTES.CART} component={CartFull} />
            <Route path={ROUTES.WISHLIST} component={WishlistFull} />
          </Switch>
        </Layout>
        <ToastContainer />
      </div>
    );
  }
}

export default withFirebase(App);
