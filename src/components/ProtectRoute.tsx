import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

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
