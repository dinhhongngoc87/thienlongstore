import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './ProductItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);
function ProductItem({ data }) {
    return (
        <Link to={`/sanpham/chitietsanpham?id=${data.id}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={`http://localhost:3000/${data.images}`} alt="" />
            <div className={cx('infor')}>
                <p className={cx('name')}>
                    <span>{data.productName} &nbsp;</span>
                </p>
            </div>
        </Link>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object,
};

export default ProductItem;
