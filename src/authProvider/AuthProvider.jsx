import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const info = {
    user,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
