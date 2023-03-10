import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product_id = params.get("id");
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
    axios
      .post(`/api/put-product-crud`, {
        id: state.id,
        productName: state.productName,
        catId: state.catId,
        supplierId: state.supplierId,
        description: state.description,
        images: state.images,
        price: state.price,
        discount: state.discount,
        quantity: state.quantity,
      })
      .then((response) => {
        alert("Success");
      });
    // history.push("/customers");
  };
  console.log(state);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
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
                    value={category.id ? category.id : ""}
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
                  value={supplier.id ? supplier.id : ""}
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
          <Form.Group as={Col} controlId="formGridImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="images"
              value={state.images ? state.images : ""}
              onChange={handleChange}
              type="text"
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
