const initialState = {
  product: "",
  message: "",
  error: "",
  products: ""
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        addProductMessage: action.payload.message,
        product: action.payload.product,
      };
    case "ADD_PRODUCT_ERROR":
      return {
        ...state,
        error: action.payload.error,
        addProductMessage: null,
      };
      case "ALL_PRODUCTS": 
      return{
          ...state,
          products: action.payload
      }
    default: {
      return state;
    }
  }
};
export default productReducer;
