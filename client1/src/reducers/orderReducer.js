const initialState = {
  orders: [],
  error: "",
  userOrders: []
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_ORDERS":
      return {
        ...state,
        orders: action.payload.orders,
      };
      case "GET_ORDERS":
        return {
          ...state,
          userOrders: action.payload.orders,
        };
    default: {
      return state;
    }
  }
};
export default orderReducer;
