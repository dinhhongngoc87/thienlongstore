import classNames from 'classnames/bind';
import styles from './DonHang.module.scss';
import { CartDown, Check, Delivery, Return } from '../../components/Icons';
import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import ModalDetailOrder from '../../components/ModalDetailOrder';

const cx = classNames.bind(styles);
function DonHang() {
    const [state, setState] = useState({
        orderStatus: {
            key: 'S1',
            value: 'Pending',
        },
        currentOrders: [],
        message: '',
        currentDetailOrder: {},
        isOpenDetailModal: false,
    });

    useEffect(() => {
        axios
            .get('/get-orders-by-user-id', {
                params: {
                    userId: localStorage.getItem('user_id'),
                    status: state.orderStatus.key,
                },
            })
            .then((response) => {
                console.log('RES: ', response.data);
                if (response.data.errCode === 0 && response.data.data.length > 0) {
                    setState({
                        ...state,
                        currentOrders: response.data.data,
                        message: '',
                    });
                } else if (response.data.errCode === 0 && response.data.data.length === 0) {
                    console.log(response.data);
                    setState({
                        ...state,
                        currentOrders: [],
                        message: response.data.message,
                    });
                }
            });
    }, [state.orderStatus]);

    const setStatusToPending = () => {
        setState({
            ...state,
            orderStatus: {
                ...state.orderStatus,
                key: 'S1',
                value: 'Pending',
            },
        });
    };
    const setStatusToDelivery = () => {
        setState({
            ...state,
            orderStatus: {
                ...state.orderStatus,
                key: 'S2',
                value: 'Delivery',
            },
        });
    };
    const setStatusToDone = () => {
        setState({
            ...state,
            orderStatus: {
                ...state.orderStatus,
                key: 'S3',
                value: 'Done',
            },
        });
    };
    const setStatusToReturn = () => {
        setState({
            ...state,
            orderStatus: {
                ...state.orderStatus,
                key: 'S4',
                value: 'Return',
            },
        });
    };
    const toggleModal = () => {
        setState({
            ...state,
            isOpenDetailModal: !state.isOpenDetailModal,
        });
    };
    const detailOrderClick = (order) => {
        setState({
            ...state,
            isOpenDetailModal: true,
            currentDetailOrder: order,
        });
    };

    return (
        <>
            {console.log('STATUS: ', state)}
            <div className={cx('orders-container')}>
                <div className={cx('orders-header')}>
                    <div
                        className={cx('header-icon', state.orderStatus.value === 'Pending' ? 'active' : null)}
                        onClick={setStatusToPending}
                    >
                        <CartDown />
                        <span>Chờ xử lý</span>
                    </div>
                    <div
                        className={cx('header-icon', state.orderStatus.value === 'Delivery' ? 'active' : null)}
                        onClick={setStatusToDelivery}
                    >
                        <Delivery />
                        <span>Chờ giao hàng</span>
                    </div>
                    <div
                        className={cx('header-icon', state.orderStatus.value === 'Done' ? 'active' : null)}
                        onClick={setStatusToDone}
                    >
                        <Check />
                        <span>Đã giao</span>
                    </div>
                    <div
                        className={cx('header-icon', state.orderStatus.value === 'Return' ? 'active' : null)}
                        onClick={setStatusToReturn}
                    >
                        <Return />
                        <span>Đơn đã hủy</span>
                    </div>
                </div>
                <div className={cx('orders-body')}>
                    {state.currentOrders.length > 0 ? (
                        <Table>
                            <thead>
                                <th>STT</th>
                                <th>Mã đơn hàng</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Tổng tiền</th>
                                <th>Ngày đặt hàng</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {state.currentOrders.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>#OD{order.id}</td>
                                            <td>{order.phone}</td>
                                            <td>{order.address}</td>
                                            <td>{order.totalMoney.toLocaleString()}</td>
                                            <td>{moment(order.createdAt).format('DD/MM/YYYY hh:mm')}</td>
                                            <td>
                                                <button
                                                    style={{
                                                        backgroundColor: 'rgb(65 215 99)',
                                                        color: 'white',
                                                        borderRadius: '5px',
                                                        padding: '0 5px',
                                                    }}
                                                    onClick={() => detailOrderClick(order)}
                                                >
                                                    Xem thêm
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            {state.isOpenDetailModal && (
                                <ModalDetailOrder
                                    isOpen={state.isOpenDetailModal}
                                    toggleModal={toggleModal}
                                    currentOrder={state.currentDetailOrder}
                                />
                            )}
                        </Table>
                    ) : (
                        <div style={{ textAlign: 'center', fontSize: '1.8rem' }}>
                            <span>{state.message}</span>
                            {console.log('MESS: ', state.message)}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DonHang;
