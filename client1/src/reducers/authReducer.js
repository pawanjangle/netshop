const initialState = {
  signupMessage: "",
  signupError: "",
  signinMessage: "",
  signinError: "",
  token: "",
  user: "",
  cartItems: "",
  cartTotal: 0,
  removeFromCartMessage: "",
};
const signupUser = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER":
      return {
        ...state,
        signupMessage: action.payload.message,
      };
      break;
    case "SIGNUP_ERROR":
      return {
        ...state,
        signupMessage: null,
        signupError: action.payload.error,
      };
      break;
    case "SIGNIN_USER":
      return {
        ...state,
        signinMessage: action.payload.message,
        token: action.payload.token,
        user: action.payload.user,
        cartItems: action.payload.cartItems,
      };
      break;
    case "SIGNOUT_USER":
      return {
        ...state,
        token: null,
        signinMessage: null,
        authenticated: false,
      };
      break;
    case "SIGNIN_ERROR":
      return {
        ...state,
        signinMessage: null,
        signinError: action.payload.error,
        token: null,
        authenticated: false,
      };
      break;

    default: {
      return state;
    }
  }
};
export default signupUser;
