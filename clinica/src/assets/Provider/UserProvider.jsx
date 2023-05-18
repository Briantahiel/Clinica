/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// import React, { useState, useContext } from "react";
// import PropTypes from 'prop-types';

// const userContext = React.createContext();
// const userToggleContext = React.createContext();

// export function useUserContext(){
//     return useContext(userContext);
// }
// export function useUserToggleContext(){
//     return useContext(userToggleContext);
// }
// export function UserProvider(props){
//     const [user, setUser] = useState(null);

//     const handleChangeLogin = () => {
//         if(user) {
//           setUser(null);
//         }else{

//           setUser({
//             name: 'Brian'
//           })
//         }
//       }
//     return (
//         <userContext.Provider value={user}>
//            <userToggleContext.Provider value={handleChangeLogin}>
//             {props.children}
//            </userToggleContext.Provider>
//         </userContext.Provider>
//     );
// }
// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired
// };
// import React, { useState, useContext } from "react";
// import PropTypes from 'prop-types';

// const userContext = React.createContext();

// export function UserProvider(props){
//     const [loggedInUser, setLoggedInUser] = useState(null);

//     const login = (user) => {
//         setLoggedInUser(user);
//     };

//     const logout = () => {
//         setLoggedInUser(null);
//     };

//     const value = {
//         loggedInUser,
//         login,
//         logout,
//     };

//     return (
//         <userContext.Provider value={value}>
//             {props.children}
//         </userContext.Provider>
//     );
// }

// UserProvider.propTypes = {
//     children: PropTypes.node.isRequired
// };

// export function useUserContext(){
//     return useContext(userContext);
// }
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

