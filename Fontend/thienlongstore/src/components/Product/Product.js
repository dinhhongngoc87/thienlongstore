import { useLocation, useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Product.module.scss';
import Image from '../../components/Image';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useEffect } from 'react';
const cx = className.bind(styles);
function Product(data) {
    const navigate = useNavigate();
    const handleDetail = (e, id) => {
        e.preventDefault();
        navigate(`/sanpham/chitietsanpham?id=${id}`);
        window.location.reload(true);
    };
    // useEffect({

    // }, []);
    // const handleEdit = (id) => {
    //     history.push(`/detail-product?id=${id}`);
    // };

    return (
        <div onClick={(e) => handleDetail(e, data.data.id)} className={cx('col', 'l-2', 'm-4', 'c-1')}>
            <div className={cx('product-item')}>
                <div className={cx('product-thumbnail')}>
                    <a href="/" className={cx('product-thumbnail-link')}>
                        <Image className={cx('product-thumbnail-image')} src={data.data.images} alt="product"></Image>
                    </a>
                </div>
                <div className={cx('product-info')}>
                    <div className={cx('product-name')}>{data.data.productName}</div>
                    <div className={cx('product-price')}>
                        <div className={cx('current')}>
                            {(
                                parseFloat(data.data.price) *
                                (1 - parseFloat(data.data.discount) / 100)
                            ).toLocaleString()}
                        </div>
                        &nbsp;
                        <div className={cx('sale')}>{parseFloat(data.data.price).toLocaleString()}</div>
                    </div>
                    <div className={cx('product-action')}>
                        <button className={cx('mua', 'btn')}>MUA NHANH</button>
                        <button className={cx('xem', 'btn')}>XEM NHANH</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
