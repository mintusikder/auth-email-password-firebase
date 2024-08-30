import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../firebase/config.firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  // create user 
  const createUser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  // sign In user 
  const signInUser =( email,password)=>{
   return signInWithEmailAndPassword(auth, email, password)
  }
  // signOut 
  const logOut = () =>{
   return signOut(auth)
  }
  //stateChange 
  useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser)
        setLoading(false)
        console.log("Current User", currentUser)
    })
    return(()=>{
      unSubscribe()
    })
  })
  const info = {
    user,
    loading,
    createUser,
    signInUser,
    logOut
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
