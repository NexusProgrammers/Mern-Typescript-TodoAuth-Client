import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to={"/signin"} replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
