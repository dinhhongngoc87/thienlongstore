import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Product from '../../components/Product';
import Slick from '../../components/Slick';
import Button from '../../components/Button';
import { OpenCartIcon } from '../../components/Icons';
import { connect } from 'react-redux';
import { byProduct } from '../../store/actions';
const cx = classNames.bind(styles);
function ProductDetail(props) {
    const [productInfo, setProductInfo] = useState({});
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const prodId = params.get('id');
    const [quantity, setQuantity] = useState(1);
    const [productId, setProductId] = useState(prodId);
    const [relateProducts, setRelateProduct] = useState([]);
    const sliderImages = [productInfo.images];
    const product_current = productInfo;
    useEffect(() => {
        fetch(`/api/get-product-byid?id=${productId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('ProductInfo: ', data);
                setProductInfo(data);
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
                console.log(data);
                setCategories(data.categories);
                setSuppliers(data.suppliers);
            });
    }, []);
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrease = () => {
        if (quantity === 1) {
            return;
        } else {
            setQuantity(quantity - 1);
        }
    };
    const handleOnchangeQuantity = (e) => {
        setQuantity(e.target.value);
    };
    return (
        <div className={cx('wrapper', 'col-12')}>
            <div className={cx('product_detail', 'col-12')}>
                <div className={cx('product_images', 'col-4')}>
                    <Slick sliderImages={sliderImages} />
                </div>
                <div className={cx('product-infor', 'col-4')}>
                    <div className={cx('product-name')}>
                        <h2>{productInfo.productName}</h2>
                    </div>
                    <div className={cx('product-details')}>
                        <div className={cx('product-status')}>
                            <span className={cx('brand')}>
                                Thương hiệu: &nbsp;
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    {suppliers.map((supplier) => {
                                        if (supplier.id === productInfo.supplierId) return supplier.supplierName;
                                    })}
                                </span>
                            </span>
                            <span className="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            <span className={cx('status')}>
                                Tình trạng:
                                {productInfo.stockId === 'SK1' ? (
                                    'Còn hàng'
                                ) : (
                                    <span style={{ color: 'red' }}>Hết hàng</span>
                                )}
                            </span>
                            <p className={cx('product_id')}>Mã sản phẩm:SP0{productInfo.id} </p>
                        </div>
                        <div className={cx('price-box')}>
                            <div className={cx('price')}>
                                <div className={cx('current')}>
                                    {(
                                        parseFloat(productInfo.price) *
                                        (1 - parseFloat(productInfo.discount) / 100)
                                    ).toLocaleString()}
                                    ₫
                                </div>
                                {productInfo.discount === 0 ? (
                                    <></>
                                ) : (
                                    <div className={cx('sale')}>{parseFloat(productInfo.price).toLocaleString()}</div>
                                )}
                            </div>
                            {productInfo.discount === 0 ? (
                                <></>
                            ) : (
                                <div className={cx('discount')}>
                                    <span>
                                        Tiết kiệm<strong>{productInfo.discount}%</strong>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('quantity')}>
                            <span>
                                Số lượng :<button onClick={handleDecrease}>-</button>
                                <input value={quantity} onChange={(e) => handleOnchangeQuantity(e)} type="text" />
                                <button onClick={handleIncrease}>+</button>
                            </span>
                        </div>
                        <div className={cx('action')}>
                            <Button
                                onClick={() => {
                                    console.log('PROPS=================>', props);
                                    props.byProduct(product_current);
                                }}
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
                                    if (category.id === productInfo.catId) return category.catName;
                                })}
                                 
                            </td>
                        </tr>
                        <tr>
                            <td>Thương hiệu </td>
                            <td>
                                {suppliers.map((supplier) => {
                                    if (supplier.id === productInfo.supplierId) return supplier.supplierName;
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td>Số lượng còn</td>
                            <td>{productInfo.quantity}</td>
                        </tr>
                    </table>
                    <h5>
                        <b>Tính năng</b>
                    </h5>
                    <p>{productInfo.description}</p>
                </div>

                <div className={cx('suggestion', 'col-12')}>
                    <h2>
                        <b>Sản phẩm cùng loại</b>
                    </h2>
                    <div className={cx('suggested-products')}>
                        {relateProducts.map((product, index) => (
                            <Product key={index} data={product} />
                        ))}
                    </div>
                </div>
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
        buyProduct: (product_current) => dispatch(byProduct(product_current)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
