import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "react-bootstrap/Image";
import noImage from "../assets/images/no-image.png";

function DetailProduct() {
  const [state, setState] = useState({
    id: "",
    productName: "",
    catId: "",
    supplierId: "",
    description: "",
    images: "",
    price: "",
    discount: "",
    quantity: "",
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product_id = params.get("id");
  let history = useHistory();
  //   const [state, setState] = useState();
  useEffect(() => {
    if (product_id) {
      fetch(`/api/get-product-byid?id=${product_id}`)
        .then((response) => response.json())
        .then((data) => {
          setState(data);
        });
    }

    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setSuppliers(data.suppliers);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("productName", state.productName);
    formData.append("catId", state.catId);
    formData.append("supplierId", state.supplierId);
    formData.append("description", state.description);
    formData.append("images", state.images);
    formData.append("price", state.price);
    formData.append("discount", state.discount);
    formData.append("quantity", state.quantity);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post(`/api/put-product-crud`, formData, config).then((response) => {
      toast.success("Edit successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (response.status === 200) {
        setTimeout(() => {
          history.push("/products");
        }, 2500);
      }
    });
    // history.push("/customers");
  };
  console.log(state);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log("STATE: ", state);
  };
  const changeValueCategory = (e) => {
    setState({
      ...state,
      catId: e.target.value,
    });
  };
  const changeValueSupplier = (e) => {
    setState({
      ...state,
      supplierId: e.target.value,
    });
  };
  const handleChangeAvatar = (e) => {
    setState({
      ...state,
      images: e.target.files[0],
    });

    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file);
  };

  return (
    <>
      {/* <form>
        <input type="text" value={state.productName} />
      </form> */}
      <Form>
        <Row className="mb-3">
          <div className="col-12 mt-3 mb-3">
            <h2>Edit product's information</h2>
          </div>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type="text"
              value={state.productName ? state.productName : ""}
              name="productName"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={changeValueCategory}
              name="category"
            >
              {categories.map((category) => (
                <>
                  <option
                    key={category.id}
                    value={category.id ? category.id : categories[0].id}
                    selected={category.id === state.catId}
                  >
                    {category.catName}
                  </option>
                </>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridSupplier">
            <Form.Label>Supplier</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="supplier"
              onChange={changeValueSupplier}
            >
              {suppliers.map((supplier) => (
                <option
                  key={supplier.id}
                  value={supplier.id ? supplier.id : suppliers[0].id}
                  selected={supplier.id === state.supplierId}
                >
                  {supplier.supplierName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={state.description ? state.description : ""}
              onChange={handleChange}
              as="textarea"
              style={{ height: "150px" }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            controlId="formGridPassword"
            style={{ position: "relative" }}
          >
            {avatarPreview ? (
              <Image
                class="img-thumbnail"
                style={{ width: "10rem", height: "10rem" }}
                thumbnail
                rounded
                alt="avatar"
                src={avatarPreview.preview}
              />
            ) : (
              <Image
                class="img-thumbnail"
                style={{ width: "10rem", height: "10rem" }}
                thumbnail
                rounded
                alt="avatr"
                src={
                  state.images
                    ? `http://localhost:3000/${state.images}`
                    : noImage
                }
              />
            )}

            <input
              type="file"
              name="avatar"
              onChange={handleChangeAvatar}
              style={{ position: "absolute", bottom: 0 }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              value={state.price ? state.price : ""}
              onChange={handleChange}
              type="number"
            />
            <Form.Label>Discount(%)</Form.Label>
            <Form.Control
              name="discount"
              value={state.discount ? state.discount : ""}
              onChange={handleChange}
              type="number"
            />
          </Form.Group>
        </Row>
        {/* {product_id ? (<></>):(<>
        </>)} */}
        <Row>
          <Form.Group as={Col} controlId="formGridQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              value={state.quantity ? state.quantity : ""}
              onChange={handleChange}
              type="number"
            />
          </Form.Group>
        </Row>
        <input value={state.id ? state.id : ""} name="id" type="text" hidden />
        <Button onClick={handleSubmit} variant="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default DetailProduct;
