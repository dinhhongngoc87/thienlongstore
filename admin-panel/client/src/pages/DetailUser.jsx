import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Image from "react-bootstrap/Image";
import noImage from "../assets/images/no-image.png";
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
  const [avatarPreview, setAvatarPreview] = useState();
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    avatar: "",
    phone: "",
    id: "",
  });
  let history = useHistory();
  useEffect(() => {
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
    };
  }, [avatarPreview]);
  useEffect(() => {
    fetch(`/edit-user-crud?id=${user_id}`)
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
  //handle choose avatar
  const handleChangeAvatar = (e) => {
    setState({
      ...state,
      avatar: e.target.files[0],
    });

    console.log("FILE : ", e.target.files[0]);
    console.log("CHANGE AVATAR: ", state);
    setUpdate(!update);

    //handle preview avatar
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("firstName", state.firstName);
    formData.append("lastName", state.lastName);
    formData.append("address", state.address);
    formData.append("avatar", state.avatar);
    formData.append("phone", state.phone);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("/put-crud", formData, config).then((response) => {
      toast.success("Successfully", {
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
                  state.avatar
                    ? `http://localhost:3000/${state.avatar}`
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
        <Row className="mb-3">
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
