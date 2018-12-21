import { combineReducers } from 'redux';

import productReducer from './product';
import wishlistReducer from './wishlist';
import cartReducer from './cart';
import productListsReducer from './productList';
import errorsReducer from './errors';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  lists: productListsReducer,
  errors: errorsReducer
});

export default rootReducer;
