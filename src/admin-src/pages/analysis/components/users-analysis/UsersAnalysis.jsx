import React from "react";
import { MdGroups } from "react-icons/md";
import { useSelector } from "react-redux";
import { Loading } from "../loading/Loading";
import "./users-analysis.scss";
function UsersAnalysis() {
  const usersAdminState = useSelector((state) => state.usersAdmin);
  const { allUsers, fetchingUsersAdmin } = usersAdminState;
  const adminNumber = allUsers.filter(
    (user, index) => user.role === "admin"
  ).length;
  return (
    <div className="analysis__users analysis__item">
      <div className="analysis__title">
        <p>Người dùng</p>
        <div className="icon">
          <MdGroups />
        </div>
      </div>
      {fetchingUsersAdmin ? (
        <Loading />
      ) : (
        <div className="analysis__content">
          <p>
            <span>Tổng: </span>
            {allUsers.length}
          </p>
          <p>
            <span>Admin: </span>
            {adminNumber}
          </p>
        </div>
      )}
    </div>
  );
}

export default UsersAnalysis;
