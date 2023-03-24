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
function ModalEditCategory({
  isOpen,
  toggleModal,
  createCategory,
  currentCategory,
}) {
  const toggle = () => toggleModal();
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState({
    isOpenEditModal: false,
    isOpenCreateModal: false,
    id: currentCategory.id,
    catName: currentCategory.catName,
  });
  useEffect(() => {}, []);
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log("state", state);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("catName", state.firstName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    createCategory(formData, config);

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
        <ModalHeader toggle={toggle}>Thêm danh mục</ModalHeader>
        <ModalBody>
          <Form encType="multipart/form-data">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nhập tên danh mục</Form.Label>
                <Form.Control
                  type="text"
                  name="catName"
                  value={state.catName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
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

export default ModalEditCategory;
