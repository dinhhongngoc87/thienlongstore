import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './KetQuaTimKiem.module.scss';
import Product from '../../components/Product';
const cx = classNames.bind(styles);
function KetQuaTimKiem() {
    const location = useLocation();
    return (
        <>
            <h1>Kết quả tìm kiếm</h1>
            <div className={cx('grid-container')}>
                {location.state.result.map((item, index) => (
                    <Product key={index} data={item} />
                ))}
            </div>
        </>
    );
}

export default KetQuaTimKiem;
