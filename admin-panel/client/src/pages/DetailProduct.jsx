import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function DetailProduct() {
  const [state, setState] = useState({});
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const product_id = params.get("id");
  //   const [state, setState] = useState();
  useEffect(() => {
    fetch(`/api/get-product-byid?id=${product_id}`)
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      });
    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setSuppliers(data.suppliers);
      });
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    // history.push("/customers");
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
      <Form
        onSubmit={handleSubmit}
        action="/api/put-product-crud"
        method="POST"
      >
        <Row className="mb-3">
          <div className="col-12 mt-3 mb-3">
            <h2>Edit product's information</h2>
          </div>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type="text"
              value={state.productName}
              name="productName"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example" name="category">
              {categories.map((category) => (
                <>
                  <option
                    key={category.id}
                    value={category.id}
                    onChange={changeValueCategory}
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
                  value={supplier.id}
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
              value={state.description}
              onChange={handleChange}
              as="textarea"
              style={{ height: "150px" }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridImage">
            {/* <Form.Label>Image</Form.Label>
            <Form.Control
              name="images"
              value={state.images}
              onChange={handleChange}
              type="file"
            /> */}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              value={state.price}
              onChange={handleChange}
              type="number"
            />
            <Form.Label>Discount(%)</Form.Label>
            <Form.Control
              name="discount"
              value={state.discount}
              onChange={handleChange}
              type="number"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              value={state.quantity}
              onChange={handleChange}
              type="number"
            />
          </Form.Group>
        </Row>
        <input value={state.id} name="id" type="text" hidden />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default DetailProduct;
