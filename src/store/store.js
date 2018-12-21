import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import {
  allProductsRef,
  cartRef,
  wishlistRef,
  listsRef
} from '../components/Firebase';

const composeEnhancers = composeWithDevTools({});

const firestoreRefs = {
  allProducts: allProductsRef,
  cart: cartRef,
  wishlist: wishlistRef,
  lists: listsRef
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(firestoreRefs)))
);

export default store;
