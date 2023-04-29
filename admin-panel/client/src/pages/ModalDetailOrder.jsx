import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "react-bootstrap/Image";
import "react-toastify/dist/ReactToastify.css";
import { getAllProductService } from "../services/productService";
function ModalDetailOrder({ isOpen, toggleModal, currentOrder }) {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({
    orders: [],
  });
  let getProductData = async () => {
    let res = await getAllProductService();
    if (res) {
      setProducts(res.products);
    }
  };
  useEffect(() => {
    fetch(
      `/get-order-detail?order_id=${currentOrder.id}&createdAt=${currentOrder.createdAt}`
    )
      .then((response) => response.json())
      .then((data) => {
        setState({
          ...state,
          orders: [...data.data],
        });
      })
      .then(() => {
        getProductData();
      });
  }, []);

  const toggle = () => toggleModal();
  return (
    <>
      <Modal
        size="lg"
        centered
        isOpen={isOpen}
        toggle={toggle}
        className="modal-user-container"
      >
        <ModalHeader toggle={toggle}>Chi tiết đơn hàng</ModalHeader>
        <ModalBody>
          <div>
            <span>
              <b>Tên</b>:{" "}
            </span>
            <span>{currentOrder.fullName} </span>
          </div>
          <div>
            <span>
              <b>Email</b>:{" "}
            </span>
            <span>{currentOrder.email} </span>
          </div>
          <div>
            <span>
              <b>Địa chỉ</b>:{" "}
            </span>
            <span>{currentOrder.address} </span>
          </div>
          <div>
            <span>
              <b>Số điện thoại</b>:{" "}
            </span>
            <span>{currentOrder.phone} </span>
          </div>
          <div>
            <div>
              <b>Sản phẩm</b>
            </div>
            <table style={{}} className="product-list">
              {state.orders.map((product, index) => (
                <tr
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="product-item"
                >
                  {products.map((p) => {
                    if (p.id === product.product_id) {
                      return (
                        <>
                          <div>
                            <Image
                              class="img-thumbnail"
                              thumbnail
                              rounded
                              alt="avatr"
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                              src={`http://localhost:3000/${p.images}`}
                            />
                            <span
                              style={{
                                maxWidth: "350px",
                                overflow: "hidden",
                              }}
                            >
                              {p.productName}
                            </span>
                          </div>

                          <div
                            style={{
                              width: "100px",
                            }}
                          >
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              {product.quantity}
                            </span>
                            x {product.price.toLocaleString()}
                          </div>
                        </>
                      );
                    }
                  })}
                </tr>
              ))}
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalDetailOrder;
