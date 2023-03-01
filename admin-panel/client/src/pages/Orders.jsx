import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
const customerTableHead = [
  "No.",
  "email",
  "phone",
  "address",
  "product name",
  "Quantity",
  "Status",
  "action",
];

// const renderHead = (item, index) => <th key={index}>{item}</th>;

// const renderBody = (item, index) => (
//   <tr key={index}>
//     <td>{index}</td>
//     <td>{item.name}</td>
//     <td>{item.email}</td>
//     <td>{item.phone}</td>
//     <td>{item.address}</td>
//     <td>{item.roleId}</td>
//     <td>
//       <a href="/">Delete</a>
//       <a href="/">Edit</a>
//     </td>
//   </tr>
// );

const Orders = () => {
  let history = useHistory();
  const [orders, setOrder] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/get-orders-crud")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
      });
  }, []);
  console.log("ORDERS: ===>", orders);

  const handleEdit = (id) => {
    history.push(`/detail-order?id=${id}`);
  };
  const handleCreate = () => {
    history.push(`/create-order`);
  };
  const handleDelete = (id) => {
    axios
      .get(`/delete-crud`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        alert(response.data);
        window.location.reload();
      });
  };
  return (
    <div>
      <h2 className="page-header">Orders</h2>
      <div class="row">
        <div className="mb-3"></div>
      </div>
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
                  {orders.map((order, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>{order.address}</td>
                      <td>
                        {products.map((product) => {
                          return product.id === order.productId
                            ? product.productName
                            : "";
                        })}
                      </td>
                      <td>{order.totalProduct}</td>
                      <td>{order.statusId === "S1" ? "Pending" : "Unknown"}</td>
                      <td>
                        <Button
                          onClick={() => {
                            handleEdit(order.id);
                          }}
                          warning
                          small
                          type="sub"
                        >
                          Accept
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
