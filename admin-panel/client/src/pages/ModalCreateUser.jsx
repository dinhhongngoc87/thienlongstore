import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
function ModalCreateUser({ isOpen, toggleModal, userInfor, createUser }) {
  const toggle = () => toggleModal();
  const [avatarPreview, setAvatarPreview] = useState();
  const [update, setUpdate] = useState(false);
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
  useEffect(() => {
    if (userInfor && !_.isEmpty(userInfor)) {
      setState({
        firstName: userInfor.firstName,
        lastName: userInfor.lastName,
        email: userInfor.email,
        password1: userInfor.password1,
        password2: userInfor.password2,
        address: userInfor.address,
        phone: userInfor.phone,
        image: userInfor.image,
        roleId: userInfor.roleId,
      });
    }
    return () => {
      avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
    };
  }, []);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log("state", state);
  };
  //handle choose avatar
  const handleChangeAvatar = (e) => {
    setState({
      ...state,
      image: e.target.files[0],
    });

    console.log("FILE : ", e.target.files[0]);
    console.log("CHANGE image: ", state);
    setUpdate(!update);

    //handle preview avatar
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file);
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
    createUser(formData, config);

    // axios.post("/put-crud", formData, config).then((response) => {
    //   toast.success("Successfully", {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });

    //   if (response.data.errCode === 0 && response.status === 200) {
    //     setUpdate(!update);
    //   }
    // });
  };
  return (
    <>
      <Modal
        size="lg"
        centered
        isOpen={isOpen}
        toggle={toggle}
        className="modal-user-container"
      >
        <ModalHeader toggle={toggle}>Tạo tài khoản mới</ModalHeader>
        <ModalBody>
          <Form encType="multipart/form-data">
            <Row className="mb-3">
              <div className="col-12 mt-3 mb-3"></div>
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
                  onChange={handleChangeAvatar}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress1">
                {avatarPreview && (
                  <Image
                    class="img-thumbnail"
                    style={{ width: "10rem", height: "10rem" }}
                    thumbnail
                    rounded
                    alt="avatar"
                    src={avatarPreview.preview}
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Tạo
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
