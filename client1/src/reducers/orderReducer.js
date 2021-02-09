const initialState = {
  orders: [],
  error: "",
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_ORDERS":
      return {
        ...state,
        orders: action.payload.orders,
      };
    default: {
      return state;
    }
  }
};
export default orderReducer;
