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
function ModalEditProduct({
  isOpen,
  toggleModal,
  editProduct,
  currentProduct,
}) {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState();
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState({
    id: currentProduct.id,
    productName: currentProduct.productName,
    catId: currentProduct.catId,
    supplierId: currentProduct.supplierId,
    description: currentProduct.description,
    images: currentProduct.images,
    price: currentProduct.price,
    discount: currentProduct.discount,
    quantity: currentProduct.quantity,
  });
  console.log(currentProduct);
  useEffect(() => {
    fetch("/api/get-all-products")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setSuppliers(data.suppliers);
        setState({
          ...state,
          //   catId: data.categories[0].id,
          //   supplierId: data.suppliers[0].id,
        });
      });
  }, []);
  console.log(state);
  const toggle = () => toggleModal();
  useEffect(() => {
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
      images: e.target.files[0],
    });

    console.log("FILE : ", e.target.files[0]);
    console.log("CHANGE image: ", state);
    setUpdate(!update);

    //handle preview avatar
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file);
  };
  const changeValueSupplier = (e) => {
    setState({
      ...state,
      supplierId: e.target.value,
    });
  };
  const changeValueCategory = (e) => {
    setState({
      ...state,
      catId: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", state.id);
    formData.append("productName", state.productName);
    formData.append("catId", state.catId);
    formData.append("supplierId", state.supplierId);
    formData.append("description", state.description);
    formData.append("images", state.images);
    formData.append("price", state.price);
    formData.append("discount", state.discount);
    formData.append("quantity", state.quantity);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    editProduct(formData, config);

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
        <ModalHeader toggle={toggle}>Tạo sản phẩm</ModalHeader>
        <ModalBody>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  value={state.productName ? state.productName : ""}
                  name="productName"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Chủng loại</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={changeValueCategory}
                  name="category"
                >
                  {categories.map((category) => (
                    <>
                      <option
                        key={category.id}
                        value={category.id ? category.id : categories[0].id}
                        selected={category.id === state.catId}
                      >
                        {category.catName}
                      </option>
                    </>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSupplier">
                <Form.Label>NCC</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="supplier"
                  onChange={changeValueSupplier}
                >
                  {suppliers.map((supplier) => (
                    <option
                      key={supplier.id}
                      value={supplier.id ? supplier.id : suppliers[0].id}
                      selected={supplier.id === state.supplierId}
                    >
                      {supplier.supplierName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  name="description"
                  value={state.description ? state.description : ""}
                  onChange={handleChange}
                  as="textarea"
                  style={{ height: "150px" }}
                />
              </Form.Group>
            </Row>
            <Row>
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
                      state.images
                        ? `http://localhost:3000/${state.images}`
                        : noImage
                    }
                  />
                )}

                <input
                  type="file"
                  name="images"
                  onChange={handleChangeAvatar}
                  style={{ position: "absolute", bottom: 0 }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  name="price"
                  value={state.price ? state.price : ""}
                  onChange={handleChange}
                  type="number"
                />
                <Form.Label>Giảm giá(%)</Form.Label>
                <Form.Control
                  name="discount"
                  value={state.discount ? state.discount : ""}
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
            </Row>
            {/* {product_id ? (<></>):(<>
        </>)} */}
            <Row>
              <Form.Group as={Col} controlId="formGridQuantity">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  name="quantity"
                  value={state.quantity ? state.quantity : ""}
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>
            </Row>
            <input
              value={state.id ? state.id : ""}
              name="id"
              type="text"
              hidden
            />
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

export default ModalEditProduct;
