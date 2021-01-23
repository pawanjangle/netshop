const initialState = {
  addToCartMessage: "",
  cartItems: "",
  cartTotal: "",
  paymentMessage: ""
  // removeFromCartMessage:""
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        addToCartMessage: action.payload.message,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal
      };
  case "REMOVE_FROM_CART":
      return {
        ...state,
        removeFromCartMessage: action.payload.message,
        cartItems: action.payload.cartItems,
        addToCartMessage: null,
        cartTotal: action.payload.cartTotal
      };
    case "GET_CARTITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        addToCartMessage: null,
        cartTotal: action.payload.cartTotal
      };
      case "CHECKOUT":
        return{
          ...state,
          paymentMessage: action.payload.message,
          cartItems: action.payload.cartItems
        }
    default: {
      return state;
    }
  }
};
export default cartReducer;
