import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Notifications from "../components/toast/Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [editToast, setEditToast] = useState(false);

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
  const toggleEditToast = () => setEditToast(!editToast);
  const handleCloseEditToast = () => setEditToast(false);
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
        // setEditToast(true);
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
            history.push("/customers");
          }, 2500);
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default DetailUser;
