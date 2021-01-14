import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer
});
export default rootReducer;
