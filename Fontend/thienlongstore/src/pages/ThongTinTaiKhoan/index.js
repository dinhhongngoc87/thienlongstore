import classNames from 'classnames/bind';
import styles from './ThongTinTaiKhoan.module.scss';
import Image from '../../components/Image';
import { Edit } from '../../components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import ModalEditUser from '../../components/ModalEditUser';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

function ThongTinTaiKhoan(props) {
    const [state, setState] = useState({
        user: {},
    });
    const [isOpenModal, setIsOpenModal] = useState({
        isOpenEditModal: false,
    });

    useEffect(() => {
        // axios.get(`get-user-by-id/`, { params: { id: localStorage.getItem('user_id') } }).then((response) => {
        //     console.log(response);
        //     setState({
        //         ...state,
        //         user: response.data.user,
        //     });
        // });
    }, [isOpenModal.isOpenEditModal]);
    const handleOnclickEdit = () => {
        setIsOpenModal({ ...state, isOpenEditModal: true });
    };
    const doEditUser = (formdata, config) => {
        axios.post('/put-crud', formdata, config).then((response) => {
            if (response.data.errCode === 0 && response.status === 200) {
                setIsOpenModal({ ...state, isOpenEditModal: !isOpenModal.isOpenEditModal });
                toast.success('Thay đổi thành công', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });

                // setIsUpdate(!isUpdate);
            }
        });
    };
    const toggleEditModal = () => {
        setIsOpenModal({ ...isOpenModal, isOpenEditModal: !isOpenModal.isOpenEditModal });
    };
    return (
        <>
            <div className={cx('user-infor-container')}>
                <div className={cx('avatar')}>
                    <Image src={`http://localhost:3001/${props.userRedux.avatar}`} alt=""></Image>
                    <h3
                        style={{
                            fontWeight: '600',
                            fontFamily: 'Roboto',
                            marginTop: '10px',
                        }}
                    >{`${props.userRedux.firstName?.charAt(0).toUpperCase() + props.userRedux.firstName?.slice(1)} ${
                        props.userRedux.lastName?.charAt(0).toUpperCase() + props.userRedux.lastName?.slice(1)
                    }`}</h3>
                    <span>{props.userRedux.email}</span>
                </div>
                <div className={cx('infor')}>
                    <div className={cx('input-group')}>
                        <label>Họ</label>
                        <input type="text" readOnly value={props.userRedux.firstName} name="firstName" />
                    </div>
                    <div className={cx('input-group')}>
                        <label>Tên</label>
                        <input type="text" readOnly value={props.userRedux.lastName} name="lastName" />
                    </div>
                    <div className={cx('input-group')}>
                        <label>Email</label>
                        <input type="text" readOnly value={props.userRedux.email} name="email" />
                    </div>
                    <div className={cx('input-group')}>
                        <label>Số điện thoại</label>
                        <input type="text" readOnly value={props.userRedux.phone} name="phone" />
                    </div>
                    <div className={cx('input-group')}>
                        <label>Địa chỉ</label>
                        <input type="text" readOnly value={props.userRedux.address} name="address" />
                    </div>
                    <div style={{ border: 'none' }} className={cx('input-group')}>
                        <button className={cx('edit-btn')} onClick={handleOnclickEdit}>
                            <Edit className={cx('input-icon')} />
                        </button>
                    </div>
                    {isOpenModal.isOpenEditModal ? (
                        <ModalEditUser
                            userInfor={props.userRedux}
                            isOpen={isOpenModal.isOpenEditModal}
                            toggleModal={toggleEditModal}
                            editUser={doEditUser}
                        />
                    ) : (
                        <></>
                    )}
                    <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" />
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        userRedux: state.user.userInfo,
    };
};
export default connect(mapStateToProps)(ThongTinTaiKhoan);
