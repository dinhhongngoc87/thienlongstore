import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/esm/Image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CreateUser() {
  const history = useHistory();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    address: "",
    phone: "",
    image: "",
    errMessage: "",
    roleId: "R2",
  });

  const [avatar, setAvatar] = useState();
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handlePreviewImage = (e) => {
    setState({
      ...state,
      image: e.target.files[0],
    });

    //preview
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", state.firstName);
    formData.append("lastName", state.lastName);
    formData.append("email", state.email);
    formData.append("password1", state.password1);
    formData.append("password2", state.password2);
    formData.append("address", state.address);
    formData.append("phone", state.phone);
    formData.append("image", state.image);
    formData.append("roleId", state.roleId);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/post-crud", formData, config)
      .then((response) => {
        if (response.data && response.data.errCode === 0) {
          toast.success("Create successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            history.push("/customers");
          }, 2500);
        }
        if (response.data && response.data.errCode !== 0) {
          setState({
            ...state,
            errMessage: response.data.message,
          });
        }
      })
      .catch((e) => {
        if (e.response.data) {
          setState({
            ...state,
            errMessage: e.response.data.message,
          });
        }
      });
  };

  return (
    <>
      <Form encType="multipart/form-data">
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
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password1"
              value={state.password1}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Nhập lại khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              value={state.password2}
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
              // value={state.image}
              onChange={handlePreviewImage}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1">
            {avatar && (
              <Image
                class="img-thumbnail"
                style={{ width: "10rem", height: "10rem" }}
                thumbnail
                rounded
                alt="avatar"
                src={avatar.preview}
              />
            )}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1"></Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1"></Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridRole">
            <Form.Label>Role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="roleId"
              onChange={handleChange}
            >
              <option key={1} value="R2" selected>
                User
              </option>
              <option key={2} value="R1">
                Admin
              </option>
            </Form.Select>
          </Form.Group>
        </Row>

        <input value={state.id} name="id" type="text" hidden />
        <div style={{ color: "red" }}>{state.errMessage}</div>
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

export default CreateUser;
