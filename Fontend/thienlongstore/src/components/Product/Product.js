import { useLocation, useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Product.module.scss';
import Image from '../../components/Image';
import { connect } from 'react-redux';
import { byProduct } from '../../store/actions';
const cx = className.bind(styles);
function Product(data) {
    const product_current = data.data;
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
    const hanldReload = (e) => {
        e.preventDefault();
    };
    return (
        <div className={cx('col', 'l-2', 'm-4', 'c-1')}>
            <div className={cx('product-item')}>
                <div className={cx('product-thumbnail')}>
                    <a onClick={(e) => hanldReload(e)} href="/" className={cx('product-thumbnail-link')}>
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
                        {data.data.discount === 0 ? (
                            <></>
                        ) : (
                            <div className={cx('sale')}>{parseFloat(data.data.price).toLocaleString()}</div>
                        )}
                    </div>
                    <div className={cx('product-action')}>
                        <button onClick={() => data.buyProduct(product_current)} className={cx('mua', 'btn')}>
                            MUA NHANH
                        </button>
                        <button onClick={(e) => handleDetail(e, data.data.id)} className={cx('xem', 'btn')}>
                            XEM NHANH
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log('Đến map state to props đây ', state);
    return {
        cart: state.cart.cartAr,
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log('Đến dispatch to props nè');

    return {
        buyProduct: (product_current) => dispatch(byProduct(product_current)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
