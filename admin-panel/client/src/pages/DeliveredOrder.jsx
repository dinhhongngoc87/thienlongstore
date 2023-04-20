import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
import moment from "moment";
import classNames from "classnames/bind";
import "moment-timezone";
import ModalDetailOrder from "./ModalDetailOrder";
import styles from "./Orders.module.scss";
import Pagination from "../components/pagination/Pagination";
const customerTableHead = [
  "No.",
  "email",
  "Tên",
  "Điện thoại",
  "Địa chỉ",
  "Ngày đặt hàng",
  "Tổng tiền",
  "Tình trạng",
  "Hành động",
];
const cx = classNames.bind(styles);

function DeliveredOrder({ search, searchValue }) {
  let history = useHistory();
  const [orders, setOrder] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [state, setState] = useState({
    isOpenDetailModal: false,
    currentDetailOrder: {},
  });
  useEffect(() => {
    axios
      .get("/get-orders-by-type", { params: { type: "S3" } })
      .then((data) => {
        if (data.data.errCode === 0) {
          setOrder(data.data.orders);
          setCurrentItems(data.data.orders.slice(0, 10));
        }
      });
  }, []);
  const handleDetail = (order) => {
    setState({
      ...state,
      isOpenDetailModal: true,
      currentDetailOrder: order,
    });
  };
  const toggleDetailModal = () => {
    setState({
      ...state,
      isOpenDetailModal: !state.isOpenDetailModal,
    });
  };
  const changeCurrentItems = (items) => {
    setCurrentItems(items);
  };
  const doDetailProduct = () => {};
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table class="table">
                <thead>
                  <tr>
                    {customerTableHead.map((title) => (
                      <th scope="col">{title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {searchValue
                    ? search(orders).map((order, index) => (
                        <tr>
                          <td>{index}</td>
                          <td>{order.email}</td>
                          <td>{order.fullName}</td>
                          <td>{order.phone}</td>
                          <td>{order.address}</td>
                          <td>
                            {moment(order.createdAt).format("DD/MM/YYYY hh:mm")}
                          </td>
                          <td>{order.totalMoney.toLocaleString()}</td>
                          <td>
                            {order.statusId === "S3" ? "Hoàn thành" : "Unknown"}
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                handleDetail(order);
                              }}
                              success
                              small
                              type="sub"
                            >
                              Chi tiết
                            </Button>
                          </td>
                        </tr>
                      ))
                    : orders.map((order, index) => (
                        <tr>
                          <td>{index}</td>
                          <td>{order.email}</td>
                          <td>{order.fullName}</td>
                          <td>{order.phone}</td>
                          <td>{order.address}</td>
                          <td>
                            {moment(order.createdAt).format("DD/MM/YYYY hh:mm")}
                          </td>
                          <td>{order.totalMoney.toLocaleString()}</td>
                          <td>
                            {order.statusId === "S3" ? "Hoàn thành" : "Unknown"}
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                handleDetail(order);
                              }}
                              success
                              small
                              type="sub"
                            >
                              Chi tiết
                            </Button>
                          </td>
                        </tr>
                      ))}
                </tbody>
                {state.isOpenDetailModal && (
                  <ModalDetailOrder
                    isOpen={state.isOpenDetailModal}
                    toggleModal={toggleDetailModal}
                    editProduct={doDetailProduct}
                    currentOrder={state.currentDetailOrder}
                  />
                )}
              </table>
              {
                <Pagination
                  data={orders}
                  changeCurrentItems={changeCurrentItems}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveredOrder;
