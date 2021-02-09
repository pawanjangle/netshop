const initialState = {
  cartItems: [],
  cartTotal: "",
  error: ""
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
      };
    case "GET_CARTITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
      };
    case "CHECKOUT":
      return {
        ...state,
        paymentMessage: action.payload.message,
        cartItems: action.payload.cartItems,
        cartTotal: 0,
        paymentDetails: action.payload.charge.billing_details
      };
      
    case "CHECKOUT_ERROR":
      return {
        ...state,
      error: action.payload.error
      };
    default: {
      return state;
    }
  }
};
export default cartReducer;
// billing_details:
// address:
// city: "nagpur"
// country: "India"
// line1: "bhiwapur, bhiwapur, bhiwapur"
// line2: null
// postal_code: "441201"
// state: "16"
// __proto__: Object
// email: null
// name: "pawan dilip jangle"
// phone: null
// __proto__: Object
// calculated_statement_descriptor: "Stripe"
// captured: true
// created: 1612771340
// currency: "inr"
// customer: "cus_IoGsViNOn28Cms"
// description: "You purchased a product | pawanjangle1000@gmail.com"
// destination: null
// dispute: null
// disputed: false
// failure_code: null
// failure_message: null
// fraud_details: {}
// id: "ch_1IIUhMEEjqrIxGaxTGdnsgzE"
// invoice: null
// livemode: false
// metadata: {}
// object: "charge"
// on_behalf_of: null
// order: null
// outcome: {network_status: "approved_by_network", reason: null, risk_level: "normal", risk_score: 26, seller_message: "Payment complete.", …}
// paid: true
// payment_intent: null
// payment_method: "card_1ICeL1EEjqrIxGaxUUqRpCIT"
// payment_method_details:
// card:
// brand: "visa"
// checks: {address_line1_check: "pass", address_postal_code_check: "pass", cvc_check: null}
// country: "US"
// exp_month: 10
// exp_year: 2025
// fingerprint: "KFUzEinrJBCGxcQZ"
// funding: "credit"
// installments: null
// last4: "4242"
// network: "visa"
// three_d_secure: null
// wallet: null
// __proto__: Object
// type: "card"
// __proto__: Object
// receipt_email: "pawanjangle1000@gmail.com"
// receipt_number: null
// receipt_url: "https://pay.stripe.com/receipts/acct_1GXmooEEjqrIxGax/ch_1IIUhMEEjqrIxGaxTGdnsgzE/rcpt_IuJKBsiPUlrEJ21I75wdrihZRUqqaza"
// refunded: false