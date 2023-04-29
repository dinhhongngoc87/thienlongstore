import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.module.scss";
import { Plus } from "../components/Icons";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalEditProduct from "./ModalEditProduct";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
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

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [currentItems, setCurrentItems] = useState([]);
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
        setCurrentItems(data.products.slice(0, 10));
      });
  }, [update, searchValue]);
  const toggleCreateModal = () => {
    setState({
      ...state,
      isOpenCreateProduct: !state.isOpenCreateProduct,
    });
  };
  const search = (data) => {
    return data.filter((item) =>
      item.productName.toLowerCase().includes(searchValue)
    );
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
  };
  const handleDelete = (id) => {
    axios
      .get(`/delete-product-crud`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
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
  const changeCurrentItems = (items) => {
    setCurrentItems(items);
  };
  const doEditProduct = (formdata, config) => {
    axios
      .post("/api/put-product-crud", formdata, config)
      .then((response) => {
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
    axios
      .post("/api/put-product-crud", formdata, config)
      .then((response) => {
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
        <Search setSearchValue={setSearchValue} />
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
                  {searchValue
                    ? search(products).map((product, index) => (
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
                          <td>{product.price.toLocaleString()}</td>
                          <td>{product.discount}</td>
                          <td>
                            {product.stockId === "SK1"
                              ? "còn hàng"
                              : "Hết hàng"}
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
                            {/* <Button
                              // href={`/delete-crud?id=${user.id}`}
                              onClick={() => handleDelete(product.id)}
                              danger
                              small
                              type="button"
                            >
                              Xóa
                            </Button> */}
                          </td>
                        </tr>
                      ))
                    : currentItems.map((product, index) => (
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
                          <td>{product.price.toLocaleString()}</td>
                          <td>{product.discount}</td>
                          <td>
                            {product.stockId === "SK1"
                              ? "còn hàng"
                              : "Hết hàng"}
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
                    isOpen={state.isOpenEditProduct}
                    toggleModal={toggleEditModal}
                    editProduct={doEditProduct}
                    currentProduct={state.currentEitProduct}
                  ></ModalEditProduct>
                )}
              </table>
              {
                <Pagination
                  data={products}
                  changeCurrentItems={changeCurrentItems}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
