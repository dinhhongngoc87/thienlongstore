import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import noImage from '../../asset/images/';
import noimage from '../../asset/images/no-image.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import className from 'classnames/bind';
import styles from './ModalEditUser.module.scss';

const cx = className.bind(styles);
function ModalEditUser({ isOpen, toggleModal, userInfor, editUser }) {
    const toggle = () => toggleModal();
    const [avatarPreview, setAvatarPreview] = useState();
    const [update, setUpdate] = useState(false);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        avatar: '',
        phone: '',
        id: '',
    });
    useEffect(() => {
        if (userInfor && !_.isEmpty(userInfor)) {
            setState({
                firstName: userInfor.firstName,
                lastName: userInfor.lastName,
                email: userInfor.email,
                address: userInfor.address,
                avatar: userInfor.avatar,
                phone: userInfor.phone,
                id: userInfor.id,
            });
        }
        return () => {
            avatarPreview && URL.revokeObjectURL(avatarPreview.preview);
        };
    }, []);
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    //handle choose avatar
    const handleChangeAvatar = (e) => {
        setState({
            ...state,
            avatar: e.target.files[0],
        });
        setUpdate(!update);
        //handle preview avatar
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatarPreview(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', state.id);
        formData.append('firstName', state.firstName);
        formData.append('lastName', state.lastName);
        formData.append('email', state.email);
        formData.append('address', state.address);
        formData.append('avatar', state.avatar);
        formData.append('phone', state.phone);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        editUser(formData, config);

        // axios.post("/put-crud", formData, config).then((response) => {
        //   toast.success("Successfully", {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   });

        //   if (response.data.errCode === 0 && response.status === 200) {
        //     setUpdate(!update);
        //   }
        // });
    };
    return (
        <>
            <Modal size="lg" centered isOpen={isOpen} toggle={toggle} className="modal-user-container">
                <ModalHeader toggle={toggle} closeButton="true">
                    <h2 className={cx('modal-title')}>Sửa thông tin tài khoản</h2>
                </ModalHeader>
                <ModalBody>
                    <form className={cx('form-input')}>
                        <div className={cx('avatar')}>
                            {console.log('state', state)}
                            {avatarPreview ? (
                                <Image src={avatarPreview.preview} alt="" />
                            ) : (
                                <Image src={`http://localhost:3000/${state.avatar}`} alt="" />
                            )}

                            <input type="file" name="inputAvatar" onChange={handleChangeAvatar} />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Họ</span>
                            <input type="text" value={state.firstName} onChange={handleChange} name="firstName" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Tên</span>
                            <input type="text" value={state.lastName} onChange={handleChange} name="lastName" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Email</span>
                            <input type="text" value={state.email} onChange={handleChange} name="email" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Số điện thoại</span>
                            <input type="text" value={state.phone} onChange={handleChange} name="phone" />
                        </div>
                        <div className={cx('form-group')}>
                            <span>Địa chỉ</span>
                            <input type="text" value={state.address} onChange={handleChange} name="address" />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className={cx('btnSave')} onClick={handleSubmit}>
                        Lưu
                    </button>{' '}
                    <button className={cx('btnExit')} onClick={toggle}>
                        Thoát
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalEditUser;
