import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import noImage from "../assets/images/no-image.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
function ModalEditUser({ isOpen, toggleModal, userInfor, editUser }) {
  const toggle = () => toggleModal();
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
  useEffect(() => {
    if (userInfor && !_.isEmpty(userInfor)) {
      setState({
        firstName: userInfor.firstName,
        lastName: userInfor.lastName,
        address: userInfor.address,
        avatar: userInfor.avatar,
        phone: userInfor.phone,
        id: userInfor.id,
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
  };
  //handle choose avatar
  const handleChangeAvatar = (e) => {
    setState({
      ...state,
      avatar: e.target.files[0],
    });

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
    editUser(formData, config);

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
          <Form>
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
            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="formGridPassword"
                style={{ position: "relative" }}
              ></Form.Group>
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
            <input value={state.id} name="id" type="text" hidden readOnly />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Lưu
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalEditUser;
