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
const cx = classNames.bind(styles);
function ProductDetail(props) {
    const [productInfo, setProductInfo] = useState({});
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
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
                setProducts(data.products);
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
                                Th????ng hi???u: &nbsp;
                                <span style={{ color: 'blue', cursor: 'pointer' }}>
                                    {suppliers.map((supplier) => {
                                        if (supplier.id === productInfo.supplierId) return supplier.supplierName;
                                    })}
                                </span>
                            </span>
                            <span className="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            <span className={cx('status')}>
                                T??nh tr???ng:
                                {productInfo.stockId === 'SK1' ? (
                                    'C??n h??ng'
                                ) : (
                                    <span style={{ color: 'red' }}>H???t h??ng</span>
                                )}
                            </span>
                            <p className={cx('product_id')}>M?? s???n ph???m:SP0{productInfo.id} </p>
                        </div>
                        <div className={cx('price-box')}>
                            <div className={cx('price')}>
                                <div className={cx('current')}>
                                    {(
                                        parseFloat(productInfo.price) *
                                        (1 - parseFloat(productInfo.discount) / 100)
                                    ).toLocaleString()}
                                    ???
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
                                        Ti???t ki???m<strong>{productInfo.discount}%</strong>
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('quantity')}>
                            <span>
                                S??? l?????ng :<button onClick={handleDecrease}>-</button>
                                <input value={quantity} onChange={(e) => handleOnchangeQuantity(e)} type="text" />
                                <button onClick={handleIncrease}>+</button>
                            </span>
                        </div>
                        <div className={cx('action')}>
                            <Button
                                onClick={() => {
                                    console.log('PROPS: ', productInfo);
                                    return productInfo.buyProduct(productInfo);
                                }}
                                primary
                                className={cx('themvaogio')}
                                leftIcon={<OpenCartIcon />}
                            >
                                Th??m v??o gi???
                            </Button>
                            <Button outline className={cx('muangay')}>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('product-policises', 'col-4')}>
                    <h5>Thi??n Long Flexoffice.com:</h5>
                    <ul className={cx('product-policises-list')}>
                        <li>Giao h??ng to??n qu???c</li>
                        <li>S???n ph???m ch??nh h??ng</li>
                        <li>T??ch ??i???m ?????i qu??</li>
                        <li>Nhi???u khuy???n m??i, ??u ????i</li>
                    </ul>
                </div>
            </div>
            <div className={cx('product_desc', 'col-12')}>
                <h2>
                    <b>M?? t??? s???n ph???m</b>
                </h2>
                <br></br>
                <h5>
                    <b>Th??ng s??? k??? thu???t</b>
                </h5>
                <div className={cx('configuration')}>
                    <table>
                        <tr>
                            <td>T??n danh m???c</td>
                            <td>
                                {categories.map((category) => {
                                    if (category.id === productInfo.catId) return category.catName;
                                })}
                                ??
                            </td>
                        </tr>
                        <tr>
                            <td>Th????ng hi???u??</td>
                            <td>
                                {suppliers.map((supplier) => {
                                    if (supplier.id === productInfo.supplierId) return supplier.supplierName;
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td>S??? l?????ng c??n</td>
                            <td>{productInfo.quantity}</td>
                        </tr>
                    </table>
                    <h5>
                        <b>T??nh n??ng</b>
                    </h5>
                    <p>{productInfo.description}</p>
                </div>

                <div className={cx('suggestion', 'col-12')}>
                    <h2>
                        <b>S???n ph???m c??ng lo???i</b>
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
        buyProduct: (productInfo) => dispatch(buyProduct(productInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
