import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
const customerTableHead = [
  "No.",
  "name",
  "email",
  "phone",
  "address",
  "avatar",
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

  useEffect(() => {
    fetch("/get-crud")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const handleEdit = (id) => {
    history.push(`/detail-user?id=${id}`);
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
      <h2 className="page-header">customers</h2>
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
                      <td>{user.avatar}</td>
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
    </div>
  );
};

export default Customers;
