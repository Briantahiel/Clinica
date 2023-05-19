/* eslint-disable react-refresh/only-export-components */
import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (user) => {
    setLoggedInUser(user);
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  const value = {
    loggedInUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useUserContext() {
  return useContext(UserContext);
}

