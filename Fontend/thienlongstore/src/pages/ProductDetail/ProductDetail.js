import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Product from '../../components/Product';
import Slick from '../../components/Slick';
import Button from '../../components/Button';
import { OpenCartIcon } from '../../components/Icons';
import { connect } from 'react-redux';
import { buyProduct } from '../../store/actions';
import { CartContext } from '../../context/CartProvider';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);
function ProductDetail(props) {
    // const [cartItems, setCartItem] = useContext(CartContext);
    const [productInfo, setProductInfo] = useState({
        AdditionalQty: 1,
        data: {},
    });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    // const [products, setProducts] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const prodId = params.get('id');
    const [quantity, setQuantity] = useState(1);
    const [relateProducts, setRelateProduct] = useState([]);
    const sliderImages = [productInfo.data?.images];
    useEffect(() => {
        fetch(`/api/get-product-byid?id=${prodId}`)
            .then((response) => response.json())
            .then((data) => {
                setProductInfo({
                    ...productInfo,
                    data: data,
                });
                return data;
            })
            .then((data) => {
                fetch(`/api/get-products-bycategory?id=${data.catId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setRelateProduct(data);
                    });
            });
        fetch('/api/get-all-products')
            .then((response) => response.json())
            .then((data) => {
                // setProducts(data.products);
                setCategories(data.categories);
                setSuppliers(data.suppliers);
            });
    }, [prodId]);
    const handleOnchangeQuantity = (e) => {
        // setQuantity(e.target.value);
        setProductInfo({
            ...productInfo,
            AdditionalQty: Number(e.target.value),
        });
    };
    const handleAddToCart = () => {
        const productInCart = props.cart.find((item) => item.id === productInfo.data.id);
        if (productInCart) {
            if (Number(productInfo.AdditionalQty + productInCart.qtyIncart) > Number(productInfo.data.quantity)) {
                toast.warn('Quá số lượng cho phép', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                props.buyProduct(productInfo);
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
            }
        } else {
            if (productInfo.AdditionalQty > productInfo.quantity) {
                toast.warn('Quá số lượng cho phép', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                props.buyProduct(productInfo);
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
            }
        }
    };
    return (
        <div className={cx('wrapper', 'col-12')}>
            <div className={cx('product_detail', 'col-12')}>
                <div className={cx('product_images', 'col-4')}>
                    <Slick sliderImages={sliderImages} />
                </div>
                <div className={cx('product-infor', 'col-4')}>
                    <div className={cx('product-name')}>
                        <h2>{productInfo.data.productName}</h2>
                    </div>
                    <div className={cx('product-details')}>
                        <div className={cx('product-status')}>
                            <span className={cx('brand')}>
                                Thương hiệu: &nbsp;
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    {suppliers.map((supplier) => {
                                        if (supplier.id === productInfo.data.supplierId) return supplier.supplierName;
                                    })}
                                </span>
                            </span>
                            <span className="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            <span className={cx('status')}>
                                Tình trạng:
                                {productInfo.data.stockId === 'SK1' ? (
                                    'Còn hàng'
                                ) : (
                                    <span style={{ color: 'red' }}>Hết hàng</span>
                                )}
                            </span>
                            <p className={cx('product_id')}>Mã sản phẩm:SP0{productInfo.data.id} </p>
                        </div>
                        <div className={cx('price-box')}>
                            <div className={cx('price')}>
                                <div className={cx('current')}>
                                    {(
                                        parseFloat(productInfo.data.price) *
                                        (1 - parseFloat(productInfo.data.discount) / 100)
                                    ).toLocaleString()}
                                    ₫
                                </div>
                                {productInfo.data.discount === 0 ? (
                                    <></>
                                ) : (
                                    <div className={cx('sale')}>
                                        {parseFloat(productInfo.data.price).toLocaleString()}
                                    </div>
                                )}
                            </div>
                            {productInfo.data.discount === 0 ? (
                                <></>
                            ) : (
                                <div className={cx('discount')}>
                                    <span>
                                        Tiết kiệm<strong>{productInfo.data.discount}%</strong>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('quantity')}>
                            <span>
                                Số lượng :{/* <button onClick={handleDecrease}>-</button> */}
                                <input
                                    value={productInfo.AdditionalQty}
                                    onChange={(e) => handleOnchangeQuantity(e)}
                                    max={`${productInfo.quantity}`}
                                    min="1"
                                    type="number"
                                />
                                {/* <button onClick={handleIncrease}>+</button> */}
                            </span>
                        </div>
                        <div className={cx('action')}>
                            <Button
                                onClick={handleAddToCart}
                                primary
                                className={cx('themvaogio')}
                                leftIcon={<OpenCartIcon />}
                            >
                                Thêm vào giỏ
                            </Button>
                            <Button outline className={cx('muangay')}>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('product-policises', 'col-4')}>
                    <h5>Thiên Long Flexoffice.com:</h5>
                    <ul className={cx('product-policises-list')}>
                        <li>Giao hàng toàn quốc</li>
                        <li>Sản phẩm chính hãng</li>
                        <li>Tích điểm đổi quà</li>
                        <li>Nhiều khuyến mãi, ưu đãi</li>
                    </ul>
                </div>
            </div>
            <div className={cx('product_desc', 'col-12')}>
                <h2>
                    <b>Mô tả sản phẩm</b>
                </h2>
                <br></br>
                <h5>
                    <b>Thông số kỹ thuật</b>
                </h5>
                <div className={cx('configuration')}>
                    <table>
                        <tr>
                            <td>Tên danh mục</td>
                            <td>
                                {categories.map((category) => {
                                    if (category.id === productInfo.data.catId) return category.catName;
                                })}
                                 
                            </td>
                        </tr>
                        <tr>
                            <td>Thương hiệu </td>
                            <td>
                                {suppliers.map((supplier) => {
                                    if (supplier.id === productInfo.data.supplierId) return supplier.supplierName;
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td>Số lượng còn</td>
                            <td>{productInfo.data.quantity}</td>
                        </tr>
                    </table>
                    <h5>
                        <b>Mô tả</b>
                    </h5>
                    <p>{productInfo.data.description}</p>
                </div>

                <div className={cx('suggestion', 'col-12')}>
                    <h2>
                        <b>Sản phẩm cùng loại</b>
                    </h2>
                    <div className={cx('suggested-products', 'grid-container')}>
                        {relateProducts.map((product, index) => (
                            <Product key={index} data={product} />
                        ))}
                    </div>
                </div>
                <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" />
            </div>
        </div>
        // <>From detail {prodId}</>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        buyProduct: (productInfo) => dispatch(buyProduct(productInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
