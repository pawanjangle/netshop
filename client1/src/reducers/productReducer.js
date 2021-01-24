const initialState = {
  products: ""
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
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
