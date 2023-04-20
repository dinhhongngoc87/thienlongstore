import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import className from 'classnames/bind';
import styles from './ModalDetailOrder.module.scss';
import axios from 'axios';

const cx = className.bind(styles);
function ModalDetailOrder({ isOpen, toggleModal, currentOrder }) {
    const [products, setProducts] = useState([]);
    const [state, setState] = useState({
        orders: [],
    });
    let getProductData = async () => {
        await axios.get(`/api/get-all-products`).then((res) => {
            setProducts(res.data.products);
        });
    };
    useEffect(() => {
        fetch(`/get-order-detail?order_id=${currentOrder.id}&createdAt=${currentOrder.createdAt}`)
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
            <Modal size="lg" centered isOpen={isOpen} toggle={toggle} className="modal-user-container">
                <ModalHeader toggle={toggle} closeButton="true">
                    <h2 className={cx('modal-title')}>Thông tin đơn hàng</h2>
                </ModalHeader>
                <ModalBody>
                    <form className={cx('form-input')}>
                        <div className={cx('form-group')}>
                            <span>Tên</span>
                            <input type="text" value={currentOrder.fullName} readOnly name="firstName" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Email</span>
                            <input type="text" value={currentOrder.email} readOnly name="lastName" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Địa chỉ</span>
                            <input type="text" value={currentOrder.address} readOnly name="email" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Số điện thoại</span>
                            <input type="text" value={currentOrder.phone} readOnly name="phone" />
                        </div>
                    </form>
                    <table style={{}} className="product-list">
                        {state.orders.map((product, index) => (
                            <tr
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    margin: '10px 0',
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
                                                            width: '50px',
                                                            height: '50px',
                                                        }}
                                                        src={`http://localhost:3000/${p?.images}`}
                                                    />
                                                    <span
                                                        style={{
                                                            maxWidth: '350px',
                                                            overflow: 'hidden',
                                                            fontWeight: '500',
                                                            marginLeft: '20px',
                                                        }}
                                                    >
                                                        {p.productName}
                                                    </span>
                                                </div>

                                                <div
                                                    style={{
                                                        width: '100px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                    >
                                                        {product?.quantity}
                                                    </span>
                                                    x {product?.price.toLocaleString()}
                                                </div>
                                            </>
                                        );
                                    }
                                })}
                            </tr>
                        ))}
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className={cx('btnExit')} onClick={toggle}>
                        Thoát
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalDetailOrder;
