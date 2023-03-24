import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.module.scss";
import { Plus } from "../components/Icons";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalEditProduct from "./ModalEditProduct";

const productTableHead = [
  "No.",
  "Tên SP",
  "Loại",
  "Nhà CC",
  "giá",
  "Giảm giá",
  "Tồn kho",
  "Hành động",
];

const Products = () => {
  let history = useHistory();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState({
    isOpenCreateProduct: false,
    isOpenEditProduct: false,
    currentEitProduct: {},
  });
  useEffect(() => {
    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setCategories(data.categories);
        setSuppliers(data.suppliers);
      });
  }, [update]);
  console.log("PRODUCT", products);
  const toggleCreateModal = () => {
    setState({
      ...state,
      isOpenCreateProduct: !state.isOpenCreateProduct,
    });
  };
  const toggleEditModal = () => {
    setState({
      ...state,
      isOpenEditProduct: !state.isOpenEditProduct,
    });
  };
  const handleEdit = (product) => {
    setState({
      ...state,
      isOpenEditProduct: true,
      currentEitProduct: product,
    });
  };
  const handleCreate = () => {
    setState({
      ...state,
      isOpenCreateProduct: true,
    });
    console.log(state);
  };
  const handleDelete = (id) => {
    axios
      .get(`/delete-product-crud`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.errCode === 0) {
          setUpdate(!update);
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  const doEditProduct = (formdata, config) => {
    axios
      .post("/api/put-product-crud", formdata, config)
      .then((response) => {
        console.log(response);
        if (response.data.errCode === 0 && response.status === 200) {
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
          setState({
            ...state,
            isOpenEditProduct: !state.isOpenEditProduct,
          });
          setUpdate(!update);
        }
        if (response.data && response.data.errCode !== 0) {
          toast.error(response.data.message, {
            position: "top-right",
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
            position: "top-right",
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
  const doCreatProduct = (formdata, config) => {
    console.log(config);
    axios
      .post("/api/put-product-crud", formdata, config)
      .then((response) => {
        console.log(response);
        if (response.data.errCode === 0 && response.status === 200) {
          setState({
            ...state,
            isOpenCreateProduct: false,
          });
          setUpdate(!update);
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
        }
        if (response.data && response.data.errCode !== 0) {
          toast.error(response.data.message, {
            position: "top-right",
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
            position: "top-right",
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
  return (
    <div>
      <h2 className="page-header">Sản phẩm</h2>
      <div class="row">
        <div className="mb-3">
          <Button
            onClick={handleCreate}
            success
            large
            leftIcon={<Plus />}
            type="sub"
          >
            Thêm sản phẩm
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
                    {productTableHead.map((title) => (
                      <th scope="col">{title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{product.productName}</td>
                      <td>
                        {categories.map((category) =>
                          category.id === product.catId
                            ? category.catName
                            : null
                        )}
                      </td>
                      <td>
                        {suppliers.map((supplier) =>
                          supplier.id === product.supplierId
                            ? supplier.supplierName
                            : null
                        )}
                      </td>
                      <td>{product.price}</td>
                      <td>{product.discount}</td>
                      <td>
                        {product.stockId === "SK1"
                          ? "stocking"
                          : "out of stock"}
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            handleEdit(product);
                          }}
                          warning
                          small
                          type="sub"
                        >
                          Sửa
                        </Button>
                        <Button
                          // href={`/delete-crud?id=${user.id}`}
                          onClick={() => handleDelete(product.id)}
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
                {state.isOpenCreateProduct && (
                  <ModalCreateProduct
                    toggleModal={toggleCreateModal}
                    isOpen={state.isOpenCreateProduct}
                    createProduct={doCreatProduct}
                  />
                )}
                {state.isOpenEditProduct && (
                  <ModalEditProduct
                    toggleModal={toggleEditModal}
                    isOpen={state.isOpenEditProduct}
                    editProduct={doEditProduct}
                    currentProduct={state.currentEitProduct}
                  ></ModalEditProduct>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
