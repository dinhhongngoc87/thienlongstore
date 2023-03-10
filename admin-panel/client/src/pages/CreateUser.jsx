import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
function CreateUser() {
  const history = useHistory();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    roleId: "",
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  console.log(state);
  const handleSubmit = (e) => {
    axios
      .post("/post-crud", {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        address: state.address,
        phone: state.phone,
        roleId: state.roleId,
      })
      .then((response) => {
        if (response.status === 200) {
          history.push("/customers");
        }
      });
  };
  return (
    <>
      <Form action="/post-crud" method="POST">
        <Row className="mb-3">
          <div className="col-12 mt-3 mb-3">
            <h2>Create new user</h2>
          </div>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              value={state.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={state.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>M???t kh???u</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={state.address}
              name="address"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={state.phone}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              value={state.image}
              onChange={handleChange}
              placeholder="039 456 ...."
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridRole">
            <Form.Label>Role</Form.Label>
            <Form.Select aria-label="Default select example" name="roleId">
              <option key={1} value="R2">
                User
              </option>
              <option key={2} value="R1">
                Admin
              </option>
            </Form.Select>
          </Form.Group>
        </Row>

        <input value={state.id} name="id" type="text" hidden />
        <Button onClick={handleSubmit} variant="primary">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default CreateUser;
