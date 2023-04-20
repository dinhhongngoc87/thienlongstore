import styles from './DatHangThanhCong.module.scss';
import { ArrowLeft } from '../../components/Icons/Icons';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
const cx = classNames.bind(styles);
function DatHangThanhCong() {
    const location = useLocation();
    const order = location.state.order;
    const order_products = location.state.products;
    const [state, setState] = useState({
        orders_detail: [],
    });
    useEffect(() => {
        fetch(`/get-order-detail?order_id=${order.id}&createdAt=${order.createdAt}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('RESPONSE: ', data);
                setState({
                    ...state,
                    orders_detail: [...data.data],
                });
            });
    }, []);
    return (
        <>
            <div>
                {console.log(order)}
                {console.log(order_products)}
                {console.log('DETAIL: ', state.orders_detail)}
                <h2 className={cx('notation')}>Đặt hàng thành công</h2>
                <div className={cx('order-infor')}>
                    <h2>Thông tin đơn hàng</h2>
                    <div className={cx('invoice')}>
                        <div className={cx('header-invoice')}>
                            <div className={cx('left')}>
                                <div>From : {order.fullName}</div>
                                <div>Address:{order.address}</div>
                                <div>Phone:{order.phone}</div>
                            </div>
                            <div className={cx('right')}>
                                <div>ID:#OD{order.id}</div>
                                <div>Ngày tạo:{moment(order.createdAt).format('DD/MM/YYYY hh:mm:ss')}</div>
                                <div>Trạng thái:Chưa thanh toán</div>
                            </div>
                        </div>
                        <div className={cx('body-invoice')}>
                            <table>
                                <thead>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </thead>
                                <tbody>
                                    {order_products.map((product, index) => {
                                        return (
                                            <tr>
                                                <td style={{ width: '30px' }}>{index}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.qtyIncart}</td>
                                                <td>{product.price.toLocaleString()}</td>
                                                <td>{(product.qtyIncart * product.price).toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx('footer-invoice')}>Tổng tiền:{order.totalMoney.toLocaleString()}đ</div>
                    </div>
                </div>
            </div>
            <a href="/" className="continue">
                <ArrowLeft width="3.5rem" height="3.5rem" currentColor="#fe2c55" />
                <span style={{ color: 'red', fontSize: '2rem' }}>Tiếp tục mua hàng</span>
            </a>
        </>
    );
}

export default DatHangThanhCong;
