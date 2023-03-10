import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedRouteAdmin({ children }) {
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  if(userInfo && userInfo.role === "admin") {
    return <>{children}</>
  }

  return <Navigate to={"/"}/>
}

export default ProtectedRouteAdmin;