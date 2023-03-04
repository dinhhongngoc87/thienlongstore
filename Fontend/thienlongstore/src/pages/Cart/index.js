import React, { useEffect, useState } from 'react';
import { deleteProduct, buyProduct } from '../../store/actions';
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
import Button from '../../components/Button';
import './Cart.module.scss';

function CartCheckout(props) {
    const [productsId, setProductId] = useState([props.cart]);
    const completeFormData = new FormData();
    const [user, setUser] = useState();
    const [state, setState] = useState({
        address: '',
        userName: '',
        phone: '',
        products: props.cart.map((p) => ({
            id: p.id,
            productName: p.productName,
            qty: p?.qty || 1,
        })),
    });
    completeFormData.append('products', state.products);

    useEffect(() => {
        const Currentuser = localStorage.getItem('user');
        console.log(user);
        setUser(Currentuser);
    }, []);
    console.log('STATE: ', state);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeQty = (e) => {
        setState({
            ...state,
        });

        axios.post(`/post-order-crud`, {
            address: state.address,
            userName: state.userName,
            phone: state.phone,
            products: state.products,
        });
    };
    const handleClickBuyNow = async (e) => {
        e.preventDefault();
        axios.post(`/post-order-crud`, {
            address: state.address,
            userName: state.userName,
            phone: state.phone,
            products: state.products,
            email: user,
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
                                        {props.cart.map((product) => (
                                            <div key={product.id} className="d-flex align-items-center mb-5">
                                                <div className="flex-shrink-0">
                                                    <MDBCardImage
                                                        src={product.images}
                                                        fluid
                                                        style={{ width: '150px' }}
                                                        alt="Generic placeholder image"
                                                    />
                                                </div>

                                                <div className="flex-grow-1 ms-3">
                                                    <a
                                                        href="#!"
                                                        onClick={() => props.deleteProduct(product)}
                                                        className="float-end text-black"
                                                    >
                                                        <MDBIcon style={{ color: '#bbb' }} fas icon="times" />
                                                    </a>
                                                    <MDBTypography
                                                        tag="h5"
                                                        style={{ fontSize: '1.6rem' }}
                                                        className="text-primary"
                                                    >
                                                        {product.productName}
                                                    </MDBTypography>

                                                    <div className="d-flex align-items-center">
                                                        <p className="fw-bold mb-0 me-5 pe-3">
                                                            {parseFloat(product.price).toLocaleString()}
                                                        </p>

                                                        <div className="def-number-input number-input safari_only">
                                                            <button className="minus"></button>
                                                            <input
                                                                className="quantity fw-bold text-black"
                                                                min={0}
                                                                defaultValue={product?.qty || 1}
                                                                onChange={handleChangeQty}
                                                                type="number"
                                                            />
                                                            <button className="plus"></button>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <div className="d-flex align-items-left">
                                                                <p className="fw-bold mb-0 me-5 pe-3 mb-30">
                                                                    {product?.totalprice}
                                                                </p>
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

                                        {/* <div className="d-flex justify-content-between px-x">
                                            <p className="fw-bold">Discount:</p>
                                            <p className="fw-bold"></p>
                                        </div> */}
                                        {/* <div
                                            className="d-flex justify-content-between p-2 mb-2"
                                            style={{ backgroundColor: '#e1f5fe' }}
                                        >
                                            <MDBTypography tag="h3" className="fw-bold mb-0">
                                                Total:{props.totalprice}
                                            </MDBTypography>
                                            <MDBTypography tag="h3" className="fw-bold mb-0"></MDBTypography>
                                        </div> */}
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
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        totalprice: state.cart.totalprice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (product_current) => dispatch(deleteProduct(product_current)),
        buyProduct: (product_current) => dispatch(buyProduct(product_current)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCheckout);
