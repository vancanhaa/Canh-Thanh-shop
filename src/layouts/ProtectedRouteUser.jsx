import { notification } from "antd";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE } from "../constants/index";

function ProtectedRouteUser({ children }) {
  const userInfo = useSelector((state) => state.user.userInfoState.data);
  if (!userInfo) {
    notification.warning({
      message: "Bạn cần đăng nhập trước khi truy cập trang này!",
      style: { border: "3px solid #fcaf17" },
      duration: 2,
    });
    return <Navigate to={ROUTE.LOGIN} />;
  }

  return <>{children}</>;
}

export default ProtectedRouteUser;
