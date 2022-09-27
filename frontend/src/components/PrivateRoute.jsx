import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
