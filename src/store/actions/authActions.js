export const loginRequest = (credentials) => ({
  type: 'LOGIN_REQUEST',
  credentials
});

export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  data
});

export const loginFailure = (error) => ({
  type: 'LOGIN_ERROR',
  error
});

export const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST'
});

export const logoutSuccess = (data) => ({
  type: 'LOGOUT_SUCCESS',
  data
});

export const logoutFailure = (error) => ({
  type: 'LOGOUT_ERROR',
  error
});

export const signupRequest = (credentials) => ({
  type: 'SIGNUP_REQUEST',
  credentials
});

export const signupSuccess = (data,credentials) => ({
  type: 'SIGNUP_SUCCESS',
  data,
  credentials
});

export const signupFailure = (error) => ({
  type: 'SIGNUP_ERROR',
  error
});

export const addUserSuccess = () => ({
  type: 'ADD_USER_SUCCESS',
});

export const getUserRequest = (uid) => ({
  type: 'GET_USER_REQUEST',
  uid
});

export const getUserSuccess = (user) => ({
  type: 'GET_USER_SUCCESS',
  user
});