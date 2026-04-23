import "./PrivateLayout.scss";
import { Navigate, Outlet } from "react-router-dom"
import { NavbarAdmin } from "../admin/components/NavbarAdmin";
import { useAuthSession } from "../hooks/auth/useAuthSession";

export const PrivateLayout = () => {
  const { isAuthenticated, isCheckingAuth } = useAuthSession();

  if (isCheckingAuth) {
    return <p>Validando sesión...</p>;
  }

  return isAuthenticated ? (
    <div className="container-admin">
      <NavbarAdmin />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};
