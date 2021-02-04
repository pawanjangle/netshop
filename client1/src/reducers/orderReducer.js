const initialState = {
  orders: [],
  error: "",
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload.orders,
      };
    case "ERROR_GETTING_ORDERS":
      return {
        ...state,
        error: action.payload.error,
      };
    default: {
      return state;
    }
  }
};
export default orderReducer;
