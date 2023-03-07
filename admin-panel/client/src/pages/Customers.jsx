import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
import Notifications from "../components/toast/Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customerTableHead = [
  "No.",
  "name",
  "email",
  "phone",
  "address",
  "role",
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

const Customers = () => {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);

  const toggleDeleteToast = () => setDeleteToast(!deleteToast);
  const handleCloseDeleteToast = () => setDeleteToast(false);
  useEffect(() => {
    fetch("/get-crud")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, [isUpdate]);

  const handleEdit = (id) => {
    history.push(`/detail-user?id=${id}`);
  };
  const handleCreate = () => {
    history.push(`/create-user`);
  };
  const handleDelete = (id) => {
    axios
      .get(`/delete-crud`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        response.status === 200 &&
          response.data === "success" &&
          setDeleteToast(true);

        setIsUpdate(!isUpdate);
        toast.success("Delete successfully", {
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
  return (
    <div style={{ position: "relative" }}>
      <h2 className="page-header">customers</h2>
      <div class="row">
        <div className="mb-3">
          <Button onClick={handleCreate} success large type="sub">
            Create a new user
          </Button>
        </div>
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
                  {users.map((user, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>
                        {user.firstName}&nbsp;{user.lastName}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{user.roleId === "R1" ? "admin" : "user"}</td>
                      <td>
                        <Button
                          onClick={() => {
                            handleEdit(user.id);
                          }}
                          warning
                          small
                          type="sub"
                        >
                          Edit
                        </Button>
                        <Button
                          // href={`/delete-crud?id=${user.id}`}
                          onClick={() => handleDelete(user.id)}
                          danger
                          small
                          type="button"
                        >
                          Delete
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
      {/* <Notifications
        show={deleteToast}
        onClose={handleCloseDeleteToast}
        position="top-end"
        animation
        title="Notice"
        content="Delete successfully"
        bg="Success"
        autohide="true"
      ></Notifications> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Customers;
