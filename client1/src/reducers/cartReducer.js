const initialState = {
  addToCartMessage: "",
  cartItems: "",
  // removeFromCartMessage:""
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        addToCartMessage: action.payload.message,
        cartItems: action.payload.cartItems
      };
  case "REMOVE_FROM_CART":
      return {
        ...state,
        removeFromCartMessage: action.payload.message,
        cartItems: action.payload.cartItems,
        addToCartMessage: null
      };
    case "GET_CARTITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        addToCartMessage: null,
        cartTotal: action.payload.price
      };
    default: {
      return state;
    }
  }
};
export default cartReducer;
