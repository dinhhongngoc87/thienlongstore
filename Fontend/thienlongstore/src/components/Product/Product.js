import className from 'classnames/bind';
import styles from './Product.module.scss';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { Link } from 'react-router-dom';
import config from '../../config';
const cx = className.bind(styles);
function Product(data) {
    const navigate = useNavigate();

    const handleDetail = (productId) => {
        // navigate(`/sanpham/chitietsanpham?id=${productId}`);
    };
    return (
        <Link to={{ pathname: config.routes.chitietsanpham, id: 2 }} className={cx('col', 'l-2', 'm-4', 'c-1')}>
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
                            {parseFloat(data.data.price) * (1 - parseFloat(data.data.discount) / 100)}
                        </div>
                        &nbsp;
                        <div className={cx('sale')}>{data.data.price}</div>
                    </div>
                    <div className={cx('product-action')}>
                        <button className={cx('mua', 'btn')}>MUA NHANH</button>
                        <button onClick={handleDetail(data.data.id)} className={cx('xem', 'btn')}>
                            XEM NHANH
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Product;
