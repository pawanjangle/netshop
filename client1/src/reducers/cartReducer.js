const initialState = {
  cartItems: [],
  cartTotal: ""
};
const cartReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal
      };
      break;
  case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal
      };
      break;
    case "GET_CARTITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal
      };
      break;
      case "CHECKOUT":
        return{
          ...state,
          paymentMessage: action.payload.message,
          cartItems: action.payload.cartItems
        }
        break;
    default: {
      return state;
    }
  }
};
export default cartReducer;
