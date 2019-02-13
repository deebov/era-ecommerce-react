import { combineReducers } from 'redux';

import notificationReducer from './notifications';
import productListsReducer from './productList';
import loadingBarReducer from './loadingBar'
import wishlistReducer from './wishlist';
import productReducer from './product';
import errorsReducer from './errors';
import cartReducer from './cart';
import authReducer from './auth';

const rootReducer = combineReducers({
  notifications: notificationReducer,
  loadingBar: loadingBarReducer,
  lists: productListsReducer,
  wishlist: wishlistReducer,
  product: productReducer,
  errors: errorsReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
