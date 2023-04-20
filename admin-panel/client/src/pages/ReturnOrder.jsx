import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import moment from "moment";
import "moment-timezone";
import ModalDetailOrder from "./ModalDetailOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function ReturnOrder({ search, searchValue }) {
  const [orders, setOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [state, setState] = useState({
    isOpenDetailModal: false,
    currentDetailOrder: {},
  });
  useEffect(() => {
    axios
      .get("/get-orders-by-type", { params: { type: "S4" } })
      .then((data) => {
        if (data.data.errCode === 0) {
          setOrder(data.data.orders);
          setCurrentItems(data.data.orders.slice(0, 10));
        }
      });
  }, [update]);
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
  const handleDone = (order) => {
    axios
      .get("/update-order-status", {
        params: {
          order: order,
          typeTarget: "S3",
        },
      })
      .then((data) => {
        setUpdate(!update);
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
                          <td>{order.statusId === "S4" ? "Hủy" : "Unknown"}</td>
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
                          <td>{order.statusId === "S4" ? "Hủy" : "Unknown"}</td>
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
        <ToastContainer
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          theme="light"
        />
      </div>
    </>
  );
}

export default ReturnOrder;
