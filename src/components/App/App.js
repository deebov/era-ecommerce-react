import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

import 'react-toastify/dist/ReactToastify.min.css';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase/index';
import Layout from '../../containers/Layout/Layout';

// Import Pages
import LandingPage from '../../pages/LandingPage/LandingPage';
import CartPage from '../../pages/CartPage/CartPage';
import WishlistPage from '../../pages/WishlistPage/WishlistPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          defaultTitle="ERA by deebov"
          titleTemplate="%s | ERA by deebov"
        />
        <Layout>
          <Switch>
            <Route path={ROUTES.LANDING} exact component={LandingPage} />
            <Route path={`${ROUTES.ITEM}/:id`} component={ProductPage} />
            <Route path={ROUTES.CART} component={CartPage} />
            <Route path={ROUTES.WISHLIST} component={WishlistPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
        <ToastContainer />
      </div>
    );
  }
}

export default withFirebase(App);
