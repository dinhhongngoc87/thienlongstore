import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import './Cart.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { deleteProduct, buyProduct, changeProductQuantity } from '../../store/actions';

function CartCheckout(props) {
    const completeFormData = new FormData();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        email: '',
    });
    const [state, setState] = useState({
        address: '',
        userName: '',
        phone: '',
        products: props.cartRedux,
        errMessage: '',
    });
    completeFormData.append('products', state.products);

    useEffect(() => {
        const user_email = localStorage.getItem('user');
        const user_id = localStorage.getItem('user_id');
        setUser({ ...user, id: user_id, email: user_email });
    }, []);
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            errMessage: '',
        });
    };
    const handleChangeQty = async (e, product) => {
        if (Number(e.target.value) > product.quantity) {
            e.target.value = product.quantity;
            toast.warn('Quá số lượng cho phép', {
                position: 'top-center',
                autoClose: 100,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            props.changeProductQuantity({
                product: product,
                qty: e.target.value,
            });
        }
    };

    const handleClickBuyNow = async (e) => {
        e.preventDefault();
        axios
            .post(`/post-order-crud`, {
                address: state.address,
                userName: state.userName,
                phone: state.phone,
                products: state.products,
                email: user.email,
                user_id: user.id,
                totalMoney: props.cartRedux.reduce((acc, current) => {
                    return acc + parseFloat(current.qtyIncart * current.price);
                }, 0),
            })
            .then((response) => {
                if (response.data.errCode !== 0) {
                    setState({ ...state, errMessage: response.data.message });
                }
                if (response.data.errCode === 0) {
                    navigate('/reviewdonhang', {
                        state: {
                            order: response.data.createdOrder.order,
                            products: response.data.createdOrder.products,
                        },
                    });
                }
            });
    };
    return (
        <section className="h-100 h-custom">
            <MDBContainer className="h-100 py-5">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard className="shopping-cart" style={{ borderRadius: '15px' }}>
                            <MDBCardBody className="text-black">
                                <MDBRow>
                                    {/* action="/post-order-crud" */}
                                    <MDBCol lg="7" className="px-5 py-4">
                                        <MDBTypography
                                            tag="h3"
                                            className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                        >
                                            Sản phẩm của bạn
                                        </MDBTypography>
                                        {props.cartRedux.map((product) => (
                                            <div
                                                key={product.id}
                                                className="d-flex align-items-center mb-5"
                                                style={{ borderBottom: '1px solid #ccc' }}
                                            >
                                                <div className="flex-shrink-0">
                                                    <MDBCardImage
                                                        src={product.images}
                                                        fluid
                                                        style={{ width: '100px' }}
                                                        alt="Generic placeholder image"
                                                    />
                                                </div>

                                                <div className="flex-grow-1 ms-3">
                                                    <a
                                                        href="#!"
                                                        onClick={() => props.deleteProduct(product)}
                                                        // onClick={() => {
                                                        //     setCartItem(
                                                        //         cartItems.filter((item) => item.id !== product.id),
                                                        //     );
                                                        // }}
                                                        className="float-end text-black"
                                                    >
                                                        <MDBIcon style={{ color: '#bbb' }} fas icon="times" />
                                                    </a>
                                                    <MDBTypography
                                                        tag="h5"
                                                        style={{ fontSize: '1.6rem' }}
                                                        className="text-primary"
                                                    >
                                                        <Link to={`/sanpham/chitietsanpham?id=${product.id}`}>
                                                            {product.productName}
                                                        </Link>
                                                    </MDBTypography>

                                                    <div className="d-flex align-items-center">
                                                        <p className="fw-bold mb-0 me-5 pe-3">
                                                            {parseFloat(product.price).toLocaleString()}đ
                                                        </p>

                                                        <div className="def-number-input number-input safari_only">
                                                            {/* <button
                                                                onClick={handleIncreaseQty(product)}
                                                                className="increase"
                                                            ></button> */}
                                                            <input
                                                                className="quantity fw-bold text-black"
                                                                min={1}
                                                                defaultValue={product?.qtyIncart || 1}
                                                                // value={product.qtyIncart}
                                                                onChange={(e) => handleChangeQty(e, product)}
                                                                type="number"
                                                            />
                                                            {/* <button
                                                                onClick={handleDecreaseQty(product)}
                                                                className="decrease"
                                                            ></button> */}
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <div className="d-flex align-items-left">
                                                                <p className="fw-bold mb-0 me-5 pe-3 mb-30"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <input value={product.id} hidden name="productId" />
                                            </div>
                                        ))}
                                        <hr
                                            className="mb-4"
                                            style={{
                                                height: '2px',
                                                backgroundColor: '#1266f1',
                                                opacity: 1,
                                            }}
                                        />
                                        {/* 
                                        <div className="d-flex justify-content-between px-x">
                                            <p className="fw-bold">Discount:</p>
                                            <p className="fw-bold"></p>
                                        </div> */}
                                        <div
                                            className="d-flex justify-content-between p-2 mb-2"
                                            style={{ backgroundColor: '#e1f5fe' }}
                                        >
                                            <MDBTypography tag="h3" style={{ color: 'red' }} className="fw-bold mb-0">
                                                Tổng tiền:
                                                {props.cartRedux
                                                    .reduce((acc, current) => {
                                                        return acc + parseFloat(current.qtyIncart * current.price);
                                                    }, 0)
                                                    .toLocaleString()}
                                                đ
                                            </MDBTypography>
                                            <MDBTypography tag="h3" className="fw-bold mb-0"></MDBTypography>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="5" className="px-5 py-4">
                                        <MDBTypography
                                            tag="h3"
                                            className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                        >
                                            Thanh toán
                                        </MDBTypography>

                                        <form className="mb-5">
                                            <MDBTextArea
                                                id="textAreaExample"
                                                placeholder="Địa chỉ nhận hàng"
                                                name="address"
                                                value={state.address}
                                                onChange={handleChange}
                                                rows={4}
                                                style={{ marginBottom: '30px', fontSize: '1.6rem' }}
                                            />

                                            <MDBInput
                                                className="mb-5"
                                                type="text"
                                                placeholder="Tên người nhận"
                                                name="userName"
                                                value={state.userName}
                                                style={{ fontSize: '1.6rem' }}
                                                onChange={handleChange}
                                                size="lg"
                                            />
                                            <MDBInput
                                                className="mb-5"
                                                type="text"
                                                name="phone"
                                                value={state.phone}
                                                onChange={handleChange}
                                                placeholder="Số điện thoại"
                                                style={{ fontSize: '1.6rem' }}
                                                size="lg"
                                            />
                                            <div
                                                style={{
                                                    color: 'red',
                                                    textAlign: 'center',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                {state.errMessage}
                                            </div>

                                            <Button
                                                onClick={(e) => handleClickBuyNow(e)}
                                                primary
                                                type="submit"
                                                extraLarge
                                                size="lg"
                                            >
                                                Buy now
                                            </Button>

                                            <MDBTypography
                                                tag="h5"
                                                className="fw-bold mb-5"
                                                style={{ position: 'absolute', bottom: '0' }}
                                            >
                                                <a href="/">
                                                    <MDBIcon style={{ color: '#bbb' }} fas icon="angle-left me-2" />
                                                    Tiếp tục mua
                                                </a>
                                            </MDBTypography>
                                        </form>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" />
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        cartRedux: state.cart.cartAr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (product_current) => dispatch(deleteProduct(product_current)),
        buyProduct: (product_current) => dispatch(buyProduct(product_current)),
        changeProductQuantity: (data) => dispatch(changeProductQuantity(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCheckout);
