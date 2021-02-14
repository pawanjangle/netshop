const initialState = {
  cartItems: [],
  cartTotal: "",
  error: ""
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
      };
    case "GET_CARTITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
      };
    case "CHECKOUT":
      return {
        ...state,
        paymentMessage: action.payload.message,
        cartItems: action.payload.cartItems,
        cartTotal: 0,
      };
      
    case "CHECKOUT_ERROR":
      return {
        ...state,
      error: action.payload.error
      };
    default: {
      return state;
    }
  }
};
export default cartReducer;