import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

import * as ROUTES from '../../constants/routes';
import lazyComponent from '../../hoc/lazyComponent/lazyComponent';
import LandingPage from '../../pages/LandingPage/LandingPage';

import PrivateRoute from '../PrivateRoute/PrivateRoute';

// Import lazyloading components
const LazyProductPage = lazyComponent(() => {
  return import(/* webpackChunkName: "product" */ '../../pages/ProductPage/ProductPage');
});
LazyProductPage.preload();
const LazyWishlistPage = lazyComponent(() => {
  return import(/* webpackChunkName: "wishlist" */ '../../pages/WishlistPage/WishlistPage');
});
const LazyCartPage = lazyComponent(() => {
  return import(/* webpackChunkName: "cart" */ '../../pages/CartPage/CartPage');
});
const LazyNotFoundPage = lazyComponent(() => {
  return import(/* webpackChunkName: "404" */ '../../pages/NotFoundPage/NotFoundPage');
});

const RouteContainer = posed.div({
  enter: { opacity: 1, x: '0%' },
  exit: { opacity: 0, x: '-100%' },
});

const Routes = props => {
  return (
    <PoseGroup>
      <RouteContainer key={props.location.key + 'asd'}>
        <Switch location={props.location}>
          <Route
            path={ROUTES.LANDING}
            exact
            component={LandingPage}
            key="landing"
          />
          <Route
            path={`${ROUTES.ITEM}/:id`}
            component={LazyProductPage}
            key="product"
          />
          <PrivateRoute
            path={ROUTES.CART}
            component={LazyCartPage}
            key="cart"
          />
          <PrivateRoute
            path={ROUTES.WISHLIST}
            component={LazyWishlistPage}
            key="wishlist"
          />
          <Route component={LazyNotFoundPage} key="404" />
        </Switch>
      </RouteContainer>
    </PoseGroup>
  );
};

export default withRouter(Routes);
