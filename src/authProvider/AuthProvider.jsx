import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/config.firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign In user
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signOut
  const logOut = () => {
    return signOut(auth);
  };
  //reset email
  const resetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  //google sign IN
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  //stateChange
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Current User", currentUser);
    });
    return () => {
      unSubscribe();
    };
  });
  const info = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    resetEmail,
    googleSignIn,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
