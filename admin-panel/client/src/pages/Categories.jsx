import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus } from "../components/Icons";
import ModalCreateCategory from "./ModalCreateCategory";
import ModalEditCategory from "./ModalEditCategory";
const customerTableHead = ["No.", "Tên chủng loại", "Hành động"];

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
  const [categories, setCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [state, setState] = useState({
    isOpenEditModal: false,
    isOpenCreateModal: false,
    categoryEdit: {},
  });
  //const [deleteToast, setDeleteToast] = useState(false);
  //const toggleDeleteToast = () => setDeleteToast(!deleteToast);
  //const handleCloseDeleteToast = () => setDeleteToast(false);

  useEffect(() => {
    fetch("/api/get-all-categories")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(data.categories);
      });
  }, [isUpdate]);

  const handleEdit = (category) => {
    // history.push(`/detail-user?id=${user.id}`);
    setState({ ...state, isOpenEditModal: true, currentCategory: category });
  };
  const handleCreate = () => {
    // history.push(`/create-user`);
    setState({ ...state, isOpenCreateModal: !state.isOpenCreateModal });
  };

  const doEditCategory = (formData, config) => {
    console.log("check user from child : ", config);
    axios.post("/api/put-category-crud", formData, config).then((response) => {
      console.log("RES: ", response);

      toast.success(response.data.message, {
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
  const doCreateCategory = (formdata, config) => {
    axios
      .post("/api/put-category-crud", formdata, config)
      .then((response) => {
        console.log("RES: ", response);
        if (response.data.errCode === 0 && response.status === 200) {
          toast.success(response.data, {
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
        console.log(e);
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
    console.log("Toggle");
    setState({ ...state, isOpenEditModal: !state.isOpenEditModal });
  };
  const toggleCreateModal = () => {
    console.log("Toggle");
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
  return (
    <div style={{ position: "relative" }}>
      <h2 className="page-header">Danh mục</h2>
      <div class="row">
        <div className="mb-3">
          <Button
            onClick={handleCreate}
            success
            large
            type="sub"
            leftIcon={<Plus />}
          >
            Thêm danh mục
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
                  {categories.map((category, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{category.catName}</td>
                      <td>
                        <Button
                          onClick={() => {
                            handleEdit(category);
                          }}
                          warning
                          small
                          type="sub"
                        >
                          Sửa
                        </Button>
                        {/* <Button
                          // href={`/delete-crud?id=${category.id}`}
                          onClick={() => handleDelete(category.id)}
                          danger
                          small
                          type="button"
                        >
                          Xóa
                        </Button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {state.isOpenEditModal && (
                  <ModalEditCategory
                    toggleModal={toggleEditModal}
                    isOpen={state.isOpenEditModal}
                    currentCategory={state.currentCategory}
                    editCategory={doEditCategory}
                  />
                )}
                {state.isOpenCreateModal && (
                  <ModalCreateCategory
                    toggleModal={toggleCreateModal}
                    isOpen={state.isOpenCreateModal}
                    createCategory={doCreateCategory}
                    // errMessage={state.errMessage}
                  />
                )}
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
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default Customers;
