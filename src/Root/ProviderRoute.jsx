import { Navigate } from "react-router-dom";

const ProviderRoute = ({ children }) => {
  // Check access_token in localStorage
  const access_token = localStorage.getItem("access_token");

  return access_token ? children : <Navigate to="/login" replace />;
};

export default ProviderRoute;