import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

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
