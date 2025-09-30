import { Navigate, Outlet } from "react-router-dom"
import { AuthStore } from "../store/AuthStore"

export const PrivateLayout = () => {

  const { isAuthenticated } = AuthStore();
  return (
    (isAuthenticated) ?
      <div>
        <Outlet />
      </div>
    : <Navigate to="/login" />
  )
}
