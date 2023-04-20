import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
function ModalEditCategory({
  isOpen,
  toggleModal,
  editCategory,
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("catName", state.catName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    editCategory(formData, config);

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
