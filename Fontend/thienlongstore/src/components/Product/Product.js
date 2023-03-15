import { useLocation, useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Product.module.scss';
import Image from '../../components/Image';
import { connect } from 'react-redux';
import { buyProduct } from '../../store/actions';
import { CartContext } from '../../context/CartProvider';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = className.bind(styles);
function Product(data) {
    const [cartItems, setCartItem] = useContext(CartContext);
    const [product_current, setProductCurrent] = useState(data.data);

    const navigate = useNavigate();
    const handleDetail = (e, id) => {
        // e.preventDefault();
        navigate(`/sanpham/chitietsanpham?id=${id}`);
        // window.location.reload(true);
    };

    useEffect(() => {}, [product_current]);
    // const handleEdit = (id) => {
    //     history.push(`/detail-product?id=${id}`);
    // };
    const handleReload = (e) => {
        e.preventDefault();
    };
    const handleAddCartItem = (product) => {
        const isExist = cartItems.find((item) => item.id === product.id);
        if (!isExist) {
            console.log('Chưa có trong giỏ hàng');
            product.qtyInCart = 1;
            console.log('Product', product);
            setCartItem([...cartItems, product]);
        } else {
            isExist.qtyInCart += 1;
        }
        toast.success('Thêm vào giỏ thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        console.log('CART ITEM', cartItems);
    };
    return (
        <div className={cx('col', 'l-2', 'm-4', 'c-1')}>
            <div className={cx('product-item')}>
                <div className={cx('product-thumbnail')}>
                    <a onClick={(e) => handleReload(e)} href="/" className={cx('product-thumbnail-link')}>
                        <Image
                            className={cx('product-thumbnail-image')}
                            src={product_current.images}
                            alt="product"
                        ></Image>
                    </a>
                </div>
                <div className={cx('product-info')}>
                    <div className={cx('product-name')}>{product_current.productName}</div>
                    <div className={cx('product-price')}>
                        <div className={cx('current')}>
                            {(
                                parseFloat(product_current.price) *
                                (1 - parseFloat(product_current.discount) / 100)
                            ).toLocaleString()}
                        </div>
                        &nbsp;
                        {product_current.discount === 0 ? (
                            <></>
                        ) : (
                            <div className={cx('sale')}>{parseFloat(product_current.price).toLocaleString()}</div>
                        )}
                    </div>
                    <div className={cx('product-action')}>
                        <button
                            // onClick={() => data.buyProduct(product_current)}
                            onClick={() => {
                                handleAddCartItem(product_current);
                            }}
                            className={cx('mua', 'btn')}
                        >
                            MUA NHANH
                        </button>

                        <button onClick={(e) => handleDetail(e, product_current.id)} className={cx('xem', 'btn')}>
                            XEM NHANH
                        </button>
                    </div>
                </div>
            </div>
            {/* <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" /> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        buyProduct: (product_current) => dispatch(buyProduct(product_current)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
