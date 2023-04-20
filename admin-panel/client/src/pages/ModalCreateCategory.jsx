import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import noImage from "../assets/images/no-image.png";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalCreateCategory({ isOpen, toggleModal, createCategory }) {
  const toggle = () => toggleModal();
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState({
    isOpenEditModal: false,
    isOpenCreateModal: false,
    catName: "",
    errMessage: "",
  });
  useEffect(() => {}, []);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("catName", state.catName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    createCategory(formData, config);
  };
  return (
    <>
      {console.log("state", state)}
      <Modal
        size="lg"
        centered
        isOpen={isOpen}
        toggle={toggle}
        className="modal-user-container"
      >
        <ModalHeader toggle={toggle}>Thêm danh mục</ModalHeader>
        <ModalBody>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nhập tên danh mục</Form.Label>
                <Form.Control
                  type="text"
                  name="catName"
                  value={state.catName}
                  onChange={handleChange}
                />
                <span style={{ color: "red" }}>{state.errMessage}</span>
              </Form.Group>
            </Row>
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

export default ModalCreateCategory;
