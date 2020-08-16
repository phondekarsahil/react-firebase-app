const initState = {
  authStatus: 0,
  errMsg: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authStatus: null,
        errMsg: action.error.message
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authStatus: 1,
        user: action.data
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
        authStatus: null,
        userprofile: null
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        user: action.data,
        authStatus: null,
        errMsg: action.error.message
      };
    case 'ADD_USER_SUCCESS':
      return state;
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        userprofile: action.user
      };
    default:
      return state;
  }
};

export default authReducer;