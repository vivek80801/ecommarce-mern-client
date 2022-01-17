import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducers";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});
