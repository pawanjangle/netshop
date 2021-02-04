import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  category: categoryReducer,
  order: orderReducer
});
export default rootReducer;
