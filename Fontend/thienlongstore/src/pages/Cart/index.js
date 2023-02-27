import React, { useState } from 'react';
import { deleteProduct, byProduct } from '../../store/actions';
import { connect } from 'react-redux';
import {
    MDBBtn,
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
    const [propducts, setTotal] = useState(props.cart);
    console.log(propducts);
    return (
        <section className="h-100 h-custom">
            <MDBContainer className="h-100 py-5">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard className="shopping-cart" style={{ borderRadius: '15px' }}>
                            <MDBCardBody className="text-black">
                                <MDBRow>
                                    <MDBCol lg="7" className="px-5 py-4">
                                        <MDBTypography
                                            tag="h3"
                                            className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                        >
                                            Your products
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
                                                        {product.name}
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
                                                                defaultValue={product.qty}
                                                                type="number"
                                                            />
                                                            <button className="plus"></button>
                                                        </div>
                                                    </div>
                                                </div>
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

                                        <div className="d-flex justify-content-between px-x">
                                            <p className="fw-bold">Discount:</p>
                                            <p className="fw-bold"></p>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between p-2 mb-2"
                                            style={{ backgroundColor: '#e1f5fe' }}
                                        >
                                            <MDBTypography tag="h3" className="fw-bold mb-0">
                                                Total:{props.total}
                                            </MDBTypography>
                                            <MDBTypography tag="h3" className="fw-bold mb-0"></MDBTypography>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="5" className="px-5 py-4">
                                        <MDBTypography
                                            tag="h3"
                                            className="mb-5 pt-2 text-center fw-bold text-uppercase"
                                        >
                                            Payment
                                        </MDBTypography>

                                        <form className="mb-5">
                                            <MDBTextArea
                                                id="textAreaExample"
                                                placeholder="Địa chỉ nhận hàng"
                                                rows={4}
                                                style={{ marginBottom: '30px', fontSize: '1.6rem' }}
                                            />

                                            <MDBInput
                                                className="mb-5"
                                                type="text"
                                                placeholder="Tên người nhận"
                                                style={{ fontSize: '1.6rem' }}
                                                size="lg"
                                            />
                                            <MDBInput
                                                className="mb-5"
                                                type="text"
                                                placeholder="Số điện thoại"
                                                style={{ fontSize: '1.6rem' }}
                                                size="lg"
                                            />

                                            <Button primary extraLarge size="lg">
                                                Buy now
                                            </Button>

                                            <MDBTypography
                                                tag="h5"
                                                className="fw-bold mb-5"
                                                style={{ position: 'absolute', bottom: '0' }}
                                            >
                                                <a href="#!">
                                                    <MDBIcon style={{ color: '#bbb' }} fas icon="angle-left me-2" />
                                                    Back to shopping
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCheckout);
