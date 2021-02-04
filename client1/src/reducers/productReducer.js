const initialState = {
  products: "",
  message: "",
  error: "",
  filteredProducts: []
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
      case "ALL_PRODUCTS": 
      return{
          ...state,
          products: action.payload,
          addProductMessage: null
      }
      case "DELETE_PRODUCT": 
      return{
          ...state,
          products: state.products.filter(product=>product._id !== action.payload.result._id),
          message: action.payload.message,
          error: null        
      }
      case "DELETE_PRODUCT_FAILED": 
      return{
          ...state,        
          message: null,
          error: action.payload.error        
      }
      case "PRODUCTS_BY_CATEGORY":
        return{
          ...state,
          filteredProducts: action.payload.products
        }
    default: {
      return state;
    }
  }
};
export default productReducer;
