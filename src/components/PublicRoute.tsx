import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
