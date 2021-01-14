const initialState = {
    signupMessage: "",
    signupError: "",
    signinMessage: "",
    signinError: "",
    token: "",
    user: ""
}
const signupUser = (state = initialState, action)=>{
switch (action.type) {
    case "SIGNUP_USER":
        return {
            ...state,
            signupMessage: action.payload.message,
            authenticated: false
        }
   
    case "SIGNUP_ERROR":
        return {
            ...state,
            signupMessage: null,
            signupError: action.payload.error,
        }
  
        case "SIGNIN_USER":
            return {
                ...state,
                signinMessage: action.payload.message,
                token: action.payload.token,
                user: action.payload.user
            }
       
            case "SIGNOUT_USER": 
            return {
                ...state,
                token: null,
                signinMessage: null,
                authenticated: false
            }
      
        case "SIGNIN_ERROR":
            return {
                ...state,
                signinMessage: null,
                signinError: action.payload.error,
                token: null,
                authenticated: false
            }
            
    default: {
        return state 
    }
           
}
}
export default signupUser;