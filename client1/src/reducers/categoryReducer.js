const initialState = {
    addCategoryMessage: "",
    error: "",
    categories: []
  };
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CATEGORY":
        return {
          ...state,
          addCategoryMessage: action.payload,   
        };
      case "ADD_CATEGORY_ERROR":
        return {
          ...state,
          addCategoryMessage: null,
          error: action.payload,
        
        };
        case "GET_CATEGORIES": 
        return{
            ...state,
            categories: action.payload
        }
      default: {
        return state;
      }
    }
  };
  export default productReducer;
  