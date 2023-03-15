import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../components/button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.module.scss";

const productTableHead = [
  "No.",
  "product name",
  "category",
  "supplier",
  "price",
  "discount",
  "stock",
  "action",
];

const Products = () => {
  let history = useHistory();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [allcode, setAllcode] = useState([]);
  useEffect(() => {
    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
        setCategories(data.categories);
        setSuppliers(data.suppliers);
      });
  }, [update]);

  const handleEdit = (id) => {
    history.push(`/detail-product?id=${id}`);
  };
  const handleCreate = () => {
    history.push(`/detail-product`);
  };
  const handleDelete = (id) => {
    axios
      .get(`/delete-product-crud`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data === "Delete successfully"
        ) {
          setUpdate(!update);
          toast.success("Delete successfully", {
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
  return (
    <div>
      <h2 className="page-header">Product</h2>
      <div class="row">
        <div className="mb-3">
          <Button onClick={handleCreate} success large type="sub">
            Create a new product
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
                            handleEdit(product.id);
                          }}
                          warning
                          small
                          type="sub"
                        >
                          Edit
                        </Button>
                        <Button
                          // href={`/delete-crud?id=${user.id}`}
                          onClick={() => handleDelete(product.id)}
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

export default Products;
