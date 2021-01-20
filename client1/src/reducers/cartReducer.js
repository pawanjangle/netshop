const initialState = {
  addToCartMessage: "",
  cartItems: "",
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        addToCartMessage: action.payload,
      };
    case "GET_CARTITEMS":
      return {
        ...state,
        cartItems: action.payload,
        addToCartMessage: null,
      };
    default: {
      return state;
    }
  }
};
export default cartReducer;
