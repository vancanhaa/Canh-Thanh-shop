import React from "react";
import "./revenue-analysis.scss";
import { GiReceiveMoney } from "react-icons/gi";
import { useSelector } from "react-redux";
import common from "../../../../../utils/common";
import { Loading } from "../loading/Loading";
function RevenueAnalysis() {
  const allOrders = useSelector((state) => state.ordersAdmin.allOrders);
  const fetchingOrdersAdmin = useSelector(
    (state) => state.ordersAdmin.fetchingOrdersAdmin
  );
  const listOrdersReceived = allOrders.filter(
    (order, index) => order.status_order === "received"
  );
  const revenueValue = listOrdersReceived.reduce(
    (agr, cur, index) => agr + cur.total_order,
    0
  );

  return (
    <div className="analysis__revenue analysis__item">
      <div className="analysis__title">
        <p>Doanh thu</p>
        <div className="icon">
          <GiReceiveMoney />
        </div>
      </div>

      {fetchingOrdersAdmin ? (
        <Loading />
      ) : (
        <div className="analysis__content">
          <span className="revenue-value">
            {common.formatPrice(revenueValue)} VNĐ
          </span>
        </div>
      )}
    </div>
  );
}

export default RevenueAnalysis;
