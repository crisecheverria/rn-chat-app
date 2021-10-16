import React from 'react';

const initialState = {
  user: {},
  isLoggedIn: false,
  error: null,
  loading: false,
};

const AuthContext = React.createContext();

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN: ', action.user);
      return {
        ...prevState,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
      };

    case 'REGISTER':
      return {
        ...prevState,
        user: action.user,
      };

    case 'LOGOUT':
      return {
        ...prevState,
        user: {},
        isLoggedIn: false,
        error: null,
        loading: false,
      };

    case 'RETRIEVE_USER':
      return {
        ...prevState,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
        error: null,
        loading: false,
      };

    case 'AUTH_FAILED':
      return {
        ...prevState,
        error: action.error,
        isLoggedIn: action.isLoggedIn,
      };
  }
};

export const AuthContextProvider = ({children}) => {
  const [auth, dispatchAuth] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{auth, dispatchAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
