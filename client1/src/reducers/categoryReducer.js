const initialState = {
    categories: []
  };
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CATEGORIES": 
        return{
            ...state,
            categories: action.payload
        }
        case "DELETE_CATEGORY": 
        return{
            ...state,
           categories: state.categories.filter(category=>category._id !== action.payload.result._id),        
        }  
      default: {
        return state;
      }
    }
  };
  export default categoryReducer;
  