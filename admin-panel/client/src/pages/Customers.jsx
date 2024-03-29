import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus } from "../components/Icons";
import ModalEditUser from "./ModalEditUser";
import ModalCreateUser from "./ModalCreateUser";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import { update } from "lodash";
const customerTableHead = [
  "No.",
  "Tên",
  "email",
  "Điện thoại",
  "Địa chỉ",
  "Quyền",
  "Hành động",
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
  const [users, setUsers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [currentItems, setCurrentItems] = useState([]);
  const [state, setState] = useState({
    isOpenEditModal: false,
    isOpenCreateModal: false,
    errMessage: "",
    userEdit: {},
  });
  //const [deleteToast, setDeleteToast] = useState(false);
  //const toggleDeleteToast = () => setDeleteToast(!deleteToast);
  //const handleCloseDeleteToast = () => setDeleteToast(false);

  useEffect(() => {
    fetch("/get-crud")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setCurrentItems(data.slice(0, 4));
      });
    return () => {
      setState({
        ...state,
        errMessage: "",
      });
    };
  }, [isUpdate, searchValue]);

  const handleEdit = (user) => {
    // history.push(`/detail-user?id=${user.id}`);
    setState({ ...state, isOpenEditModal: true, userEdit: user });
  };
  const handleCreate = () => {
    // history.push(`/create-user`);
    setState({ ...state, isOpenCreateModal: !state.isOpenCreateModal });
  };
  const search = (data) => {
    return data.filter(
      (item) =>
        item.email.toLowerCase().includes(searchValue) ||
        item.firstName.includes(searchValue) ||
        item.lastName.includes(searchValue) ||
        item.phone.toLowerCase().includes(searchValue)
    );
  };
  const doEditUser = (formdata, config) => {
    axios.post("/put-crud", formdata, config).then((response) => {
      toast.success("Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (response.data.errCode === 0 && response.status === 200) {
        setState({ ...state, isOpenEditModal: !state.isOpenEditModal });
        setIsUpdate(!isUpdate);
      }
    });
  };
  const doCreateUser = (formdata, config) => {
    axios
      .post("/post-crud", formdata, config)
      .then((response) => {
        if (response.data.errCode === 0 && response.status === 200) {
          toast.success("Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setState({ ...state, isOpenCreateModal: !state.isOpenCreateModal });
          setIsUpdate(!isUpdate);
        }
        if (response.data && response.data.errCode !== 0) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((e) => {
        if (e.response.data) {
          toast.error(e.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  const toggleEditModal = () => {
    setState({ ...state, isOpenEditModal: !state.isOpenEditModal });
  };
  const toggleCreateModal = () => {
    setState({ ...state, isOpenCreateModal: !state.isOpenCreateModal });
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
  const changeCurrentItems = (items) => {
    setCurrentItems(items);
    // setIsUpdate(!update);
  };
  return (
    <div style={{ position: "relative" }}>
      <h2 className="page-header">Tài khoản</h2>
      <div class="row">
        <div className="mb-3">
          <Button
            onClick={handleCreate}
            success
            large
            type="sub"
            leftIcon={<Plus />}
          >
            Thêm tài khoản
          </Button>
        </div>
      </div>
      <div className="row">
        <Search setSearchValue={setSearchValue} />
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
                  {searchValue
                    ? search(users).map((user, index) => (
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
                                handleEdit(user);
                              }}
                              warning
                              small
                              type="sub"
                            >
                              Sửa
                            </Button>
                            <Button
                              // href={`/delete-crud?id=${user.id}`}
                              onClick={() => handleDelete(user.id)}
                              danger
                              small
                              type="button"
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))
                    : currentItems.map((user, index) => (
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
                                handleEdit(user);
                              }}
                              warning
                              small
                              type="sub"
                            >
                              Sửa
                            </Button>
                            <Button
                              // href={`/delete-crud?id=${user.id}`}
                              onClick={() => handleDelete(user.id)}
                              danger
                              small
                              type="button"
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))}
                </tbody>
                {state.isOpenEditModal && (
                  <ModalEditUser
                    toggleModal={toggleEditModal}
                    isOpen={state.isOpenEditModal}
                    userInfor={state.userEdit}
                    editUser={doEditUser}
                  />
                )}
                {state.isOpenCreateModal && (
                  <ModalCreateUser
                    toggleModal={toggleCreateModal}
                    isOpen={state.isOpenCreateModal}
                    createUser={doCreateUser}
                    errMessage={state.errMessage}
                  />
                )}
              </table>
              {users && (
                <Pagination
                  data={users}
                  changeCurrentItems={changeCurrentItems}
                />
              )}
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
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default Customers;
