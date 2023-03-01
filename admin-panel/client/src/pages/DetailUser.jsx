import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  return errors;
};
function DetailUser() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user_id = params.get("id");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    id: "",
  });
  let history = useHistory();
  useLayoutEffect(() => {
    fetch(`/edit-user-crud?id=${user_id}`, {
      firstName: state.firstName,
      lastName: state.lastName,
      address: state.address,
      phone: state.phone,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState(data);
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
    axios
      .post("/put-crud", {
        id: state.id,
        firstName: state.firstName,
        lastName: state.lastName,
        address: state.address,
        phone: state.phone,
      })
      .then((response) => {
        if (response.status === 200) {
          history.push("/customers");
        }
      });
  };
  return (
    <>
      <Form>
        <Row className="mb-3">
          <div className="col-12 mt-3 mb-3">
            <h2>Edit user's information</h2>
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
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={state.address}
              name="address"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={state.phone}
              onChange={handleChange}
              placeholder="039 456 ...."
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <input value={state.id} name="id" type="text" hidden />
        <Button onClick={handleSubmit} variant="primary">
          Submit
        </Button>
      </Form>

      {/* </Formik> */}
      {/* <Form noValidate action="/put-crud" method="PUT">
        <Row className="mb-3">
          <div className="col-12 mt-3 mb-3">
            <h2>Edit user's information</h2>
          </div>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              value={user.firstName}
              name="firstName"
              placeholder="ex: Doe"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              value={user.lastName}
              name="lastName"
              placeholder="ex: John"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={user.address}
              placeholder="1234 Main St"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={user.phone}
              placeholder="039 456 ...."
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> */}
    </>
  );
}

export default DetailUser;
