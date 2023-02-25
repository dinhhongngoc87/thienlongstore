import styles from './ProductDetail.module.scss';
import classNames from 'classnames/bind';
import Slick from '../../components/Slick';
import Button from '../../components/Button';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { OpenCartIcon } from '../../components/Icons';
import { useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const sliderImages = [
    'https://product.hstatic.net/1000230347/product/but_long_bang_thien_long_wb-02__1__1024x1024.jpg',
    'https://product.hstatic.net/1000230347/product/but_long_bang_thien_long_wb-02__10__1024x1024.jpg',
    'https://product.hstatic.net/1000230347/product/but_long_bang_thien_long_wb-02_7d0dfcae17634cc38a407fed56781417_1024x1024.jpg',
    'https://product.hstatic.net/1000230347/product/wb-02_copy_cae08ee4db264c238c3bf90c5e23130e_1024x1024.jpg',
];
const cx = classNames.bind(styles);
function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const [productId, setProductId] = useSearchParams();
    const [productInfo, setProductInfo] = useState();
    useEffect(() => {
        axios.get('/api/get-product-byid', { params: { productId: productId } }).then((response) => {
            console.log('ProductInfo: ', response.data);
            setProductInfo(response);
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
        // <div className={cx('wrapper', 'col-12')}>
        //     <div className={cx('product_detail', 'col-12')}>
        //         <div className={cx('product_images', 'col-4')}>
        //             <Slick sliderImages={sliderImages} />
        //         </div>
        //         <div className={cx('product-infor', 'col-4')}>
        //             <div className={cx('product-name')}>
        //                 <h2>Bút lông bảng Thiên Long WB-02</h2>
        //             </div>
        //             <div className={cx('product-details')}>
        //                 <div className={cx('product-status')}>
        //                     <span className={cx('brand')}>Thương hiệu: Thiên Long</span>
        //                     <span className="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        //                     <span className={cx('status')}>Tình trạng: còn hàng</span>
        //                     <p className={cx('product_id')}>Mã sản phẩm:50063322 </p>
        //                 </div>
        //                 <div className={cx('price-box')}>
        //                     <div className={cx('price')}>
        //                         <div className={cx('current')}>7,200₫</div>
        //                         <div className={cx('sale')}>8,000₫</div>
        //                     </div>
        //                     <div className={cx('discount')}>
        //                         <span>
        //                             Tiết kiệm<strong>10%</strong>
        //                         </span>
        //                     </div>
        //                 </div>
        //                 <div className={cx('quantity')}>
        //                     <span>
        //                         Số lượng :<button onClick={handleDecrease}>-</button>
        //                         <input value={quantity} onChange={(e) => handleOnchangeQuantity(e)} type="text" />
        //                         <button onClick={handleIncrease}>+</button>
        //                     </span>
        //                 </div>
        //                 <div className={cx('action')}>
        //                     <Button primary className={cx('themvaogio')} leftIcon={<OpenCartIcon />}>
        //                         Thêm vào giỏ
        //                     </Button>
        //                     <Button outline className={cx('muangay')}>
        //                         Mua ngay
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className={cx('product-policises', 'col-4')}>
        //             <h5>Thiên Long Flexoffice.com:</h5>
        //             <ul className={cx('product-policises-list')}>
        //                 <li>Giao hàng toàn quốc</li>
        //                 <li>Sản phẩm chính hãng</li>
        //                 <li>Tích điểm đổi quà</li>
        //                 <li>Nhiều khuyến mãi, ưu đãi</li>
        //             </ul>
        //         </div>
        //     </div>
        //     <div className={cx('product_desc', 'col-12')}>
        //         <h2>
        //             <b>Mô tả sản phẩm</b>
        //         </h2>
        //         <br></br>
        //         <h5>
        //             <b>Thông số kỹ thuật</b>
        //         </h5>
        //         <div className={cx('configuration')}>
        //             <table>
        //                 <tr>
        //                     <td>Tên danh mục</td>
        //                     <td> Bút gel</td>
        //                 </tr>
        //                 <tr>
        //                     <td>Thương hiệu </td>
        //                     <td>Điểm 10 </td>
        //                 </tr>
        //                 <tr>
        //                     <td>Đường kính</td>
        //                     <td>0.5mm </td>
        //                 </tr>
        //                 <tr>
        //                     <td>Màu mực</td>
        //                     <td>Xanh/tím</td>
        //                 </tr>
        //                 <tr>
        //                     <td>Đóng gói</td>
        //                     <td>20 cây/hộp</td>
        //                 </tr>
        //                 <tr>
        //                     <td>Trọng lượng</td>
        //                     <td>180 gram/hộp</td>
        //                 </tr>
        //             </table>
        //             <h5>
        //                 <b>Tính năng</b>
        //             </h5>
        //             <p>
        //                 Bút gel Điểm 10 TP-GELE01 có thiết kế đơn giản và hiện đại. Thân và nắp bút bằng nhựa trong,
        //                 sáng bóng sang trọng. Đặc biệt thân bút có những họa tiết nhân vật hoạt hình ngộ nghĩnh và đáng
        //                 yêu rất thích hợp cho học sinh tiểu học.{' '}
        //             </p>
        //         </div>

        //         <div className={cx('suggestion', 'col-12')}>
        //             <h2>
        //                 <b>Sản phẩm cùng loại</b>
        //             </h2>
        //             <div className={cx('suggested-products')}>
        //                 <Product />
        //                 <Product />
        //                 <Product />
        //                 <Product />
        //                 <Product />
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>From detail {productId}</>
    );
}

export default ProductDetail;
