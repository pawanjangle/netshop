const initialState = {
  addProductMessage: "",
  error: "",
  products: []
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        addProductMessage: action.payload,
        error: null
      };
    case "ADD_PRODUCT_ERROR":
      return {
        ...state,
        error: action.payload,
        addProductMessage: null,
      };
      case "ALL_PRODUCTS": 
      return{
          ...state,
          products: action.payload,
          addProductMessage: null
      }
    default: {
      return state;
    }
  }
};
export default productReducer;
