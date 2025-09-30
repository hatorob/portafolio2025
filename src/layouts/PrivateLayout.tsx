import "./PrivateLayout.scss";
import { Navigate, Outlet } from "react-router-dom"
import { AuthStore } from "../store/AuthStore"
import { NavbarAdmin } from "../admin/components/NavbarAdmin";

export const PrivateLayout = () => {

  const { isAuthenticated } = AuthStore();
  return (
    (isAuthenticated) ?
      <div className="container-admin">
        <NavbarAdmin />
        <Outlet />
      </div>
    : <Navigate to="/login" />
  )
}
