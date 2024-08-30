import { createContext, useState } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/config.firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  // create user 
  const createUser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const info = {
    user,
    loading,
    createUser
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
