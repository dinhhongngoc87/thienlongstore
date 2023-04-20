import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Product.module.scss';
import Image from '../../components/Image';
import { connect } from 'react-redux';
import { buyProduct } from '../../store/actions';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const cx = className.bind(styles);
function Product(data) {
    // const [cartItems, setCartItem] = useContext(CartContext);
    const [product_current, setProductCurrent] = useState(data.data);

    const navigate = useNavigate();
    const handleDetail = (e, id) => {
        navigate(`/sanpham/chitietsanpham?id=${id}`);
    };

    useEffect(() => {
        setProductCurrent(data.data);
    }, [data]);

    const handleBuyProduct = () => {
        data.buyProduct(product_current);
        toast.success('Thêm vào giỏ thành công', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };
    return (
        <div className={cx('product-item', 'grid-item')}>
            <div className={cx('product-thumbnail')}>
                <Link to={`/sanpham/chitietsanpham?id=${product_current.id}`} className={cx('product-thumbnail-link')}>
                    <Image
                        className={cx('product-thumbnail-image')}
                        src={`http://localhost:3000/${product_current.images}`}
                        alt="product"
                    ></Image>
                </Link>
            </div>
            <div className={cx('product-info')}>
                <Link to={`/sanpham/chitietsanpham?id=${product_current.id}`} className={cx('product-name')}>
                    {product_current.productName}
                </Link>
                <div className={cx('product-price')}>
                    <div className={cx('current')}>
                        {(
                            parseFloat(product_current.price) *
                            (1 - parseFloat(product_current.discount) / 100)
                        ).toLocaleString()}
                        đ
                    </div>
                    &nbsp;
                    {product_current.discount === 0 ? (
                        <></>
                    ) : (
                        <div className={cx('sale')}>{parseFloat(product_current.price).toLocaleString()}đ</div>
                    )}
                </div>
                <div className={cx('product-action')}>
                    <button
                        onClick={handleBuyProduct}
                        // onClick={() => {
                        //     handleAddCartItem(product_current);
                        // }}
                        className={cx('mua', 'btn')}
                    >
                        MUA NHANH
                    </button>

                    <button onClick={(e) => handleDetail(e, product_current.id)} className={cx('xem', 'btn')}>
                        XEM NHANH
                    </button>
                </div>
            </div>
            {product_current.discount === 0 ? (
                <></>
            ) : (
                <div className={cx('product-sale')}>
                    <span className={cx('sale-off-percent')}>{product_current.discount}%</span>
                    <span className={cx('sale-off-label')}>GIẢM</span>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartAr: state.cart.cartAr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        buyProduct: (product_current) => dispatch(buyProduct(product_current)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
