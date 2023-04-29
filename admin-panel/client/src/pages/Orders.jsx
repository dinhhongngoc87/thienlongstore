import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import classNames from "classnames/bind";
import "moment-timezone";
import styles from "./Orders.module.scss";
import { CartDown, Check, Delivery, Return } from "../components/Icons";
import PendingOrder from "./PendingOrder";
import ProcessingOrder from "./ProcessingOrder";
import DeliveredOrder from "./DeliveredOrder";
import Search from "../components/search/Search";
import ReturnOrder from "./ReturnOrder";
const customerTableHead = [
  "No.",
  "email",
  "Điện thoại",
  "Địa chỉ",
  "Ngày đặt hàng",
  "Tổng tiền",
  "Tình trạng",
  "Hành động",
];

const cx = classNames.bind(styles);
const Orders = () => {
  const [orders, setOrder] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [state, setState] = useState({
    isOpenDetailModal: false,
    currentDetailOrder: {},
    orderstatus: "PendingOrder",
  });
  useEffect(() => {
    axios.get("/get-orders-crud").then((data) => {
      if (data.data.errCode === 0) {
        setOrder(data.data.orders);
      }
    });
  }, []);
  const renderComponent = () => {
    switch (state.orderstatus) {
      case "PendingOrder":
        return <PendingOrder search={search} searchValue={searchValue} />;
      case "ProcessingOrder":
        return <ProcessingOrder search={search} searchValue={searchValue} />;
      case "DoneOrder":
        return <DeliveredOrder search={search} searchValue={searchValue} />;
      // case '4': return <ComponentFour/>;
      case "ReturnOrder":
        return <ReturnOrder search={search} searchValue={searchValue} />;
      default:
        return <PendingOrder search={search} searchValue={searchValue} />;
    }
  };
  const search = (data) => {
    return data.filter(
      (item) =>
        item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchValue) ||
        item.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );
  };
  const handleCartDownOnclick = () => {
    setState({
      ...state,
      orderstatus: "PendingOrder",
    });
  };
  const handleDeliveryOnclick = () => {
    setState({
      ...state,
      orderstatus: "ProcessingOrder",
    });
  };
  const handleDoneOnclick = () => {
    setState({
      ...state,
      orderstatus: "DoneOrder",
    });
  };
  const handleReturnOnclick = () => {
    setState({
      ...state,
      orderstatus: "ReturnOrder",
    });
  };
  return (
    <div>
      <h2 className={cx("page-header")}>Đơn hàng</h2>

      <div className="row">
        <div className={cx("navigation")}>
          <ul className={cx("navigation-list")}>
            <li
              className={cx(
                "navigation-item",
                state.orderstatus === "PendingOrder" ? "active" : null
              )}
            >
              <Button
                onClick={handleCartDownOnclick}
                leftIcon={
                  <span className={cx("CartDown-container")}>
                    <CartDown
                      className={cx("CartDown-icon")}
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </span>
                }
              >
                Đang chờ
              </Button>
            </li>
            <li
              className={cx(
                "navigation-item",
                state.orderstatus === "ProcessingOrder" ? "active" : null
              )}
            >
              <Button
                onClick={handleDeliveryOnclick}
                leftIcon={
                  <span className={cx("Delivery-container")}>
                    <Delivery
                      className={cx("Delivery-icon")}
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </span>
                }
              >
                Vận chuyển
              </Button>
            </li>
            <li
              className={cx(
                "navigation-item",
                state.orderstatus === "DoneOrder" ? "active" : null
              )}
            >
              <Button
                onClick={handleDoneOnclick}
                leftIcon={
                  <span className={cx("Check-container")}>
                    <Check
                      width="1.5rem"
                      className={cx("Check-icon")}
                      height="1.5rem"
                    />
                  </span>
                }
              >
                Đã giao
              </Button>
            </li>
            <li
              className={cx(
                "navigation-item",
                state.orderstatus === "ReturnOrder" ? "active" : null
              )}
            >
              <Button
                onClick={handleReturnOnclick}
                leftIcon={
                  <span className={cx("Return-container")}>
                    <Return
                      className={cx("Return-icon")}
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </span>
                }
              >
                Hoàn lại
              </Button>
            </li>
          </ul>
        </div>
        <div className="row">
          <Search setSearchValue={setSearchValue} />
        </div>
      </div>
      {renderComponent()}
    </div>
  );
};

export default Orders;
