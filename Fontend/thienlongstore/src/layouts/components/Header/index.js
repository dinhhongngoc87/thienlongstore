import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faUser,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from '../../components/Header/Header.module.scss';
import images from '../../../asset/images';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { PaperPlaneIcon, Message, CartIcon, Invoice } from '../../../components/Icons';
import Search from '../Search';
import config from '../../../config';
import { useModal } from '../../../hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// bind styles trả về một function cho cx
const cx = classNames.bind(styles);

function Header(props) {
    const [currentUser, setCurrentUser] = useState(false);
    const { isShowing, toggle } = useModal();
    const deleteStorage = () => {
        localStorage.setItem('user', '');
    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Thông tin tài khoản',
            to: '/thongtintaikhoan',
        },
        {
            icon: <Invoice icon={faUser} />,
            title: 'Đơn hàng',
            to: '/donhang',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            to: '/login',
            openLogin: isShowing,
            onClick: deleteStorage,
            separate: true,
        },
    ];
    const MENU_ITEMs = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and Help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
        },
    ];

    useEffect(() => {
        const userEmail = localStorage.getItem('user');
        if (userEmail) {
            setCurrentUser(true);
        } else {
            setCurrentUser(false);
        }
    }, []);
    const handleMenuChange = () => {};
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Message">
                                <button className={cx('action-btn')}>
                                    <PaperPlaneIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox">
                                <button className={cx('action-btn')}>
                                    <Message />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <div className={cx('contact')} style={{ marginRight: '30px' }}>
                                <span>Hỗ trợ khách hàng</span>
                                <br />
                                <b>1900 866 819</b>
                            </div>
                            <Button primary onClick={toggle}>
                                <Link className={cx('login')} to="/login">
                                    Đăng nhập
                                </Link>
                            </Button>
                            {/* <ModalPopup isShowing={isShowing}> */}
                            {/* <SignUp toggle={toggle}></SignUp> */}
                            {/* <Login toggle={toggle}></Login> */}
                            {/* </ModalPopup> */}
                        </>
                    )}

                    {currentUser ? (
                        <>
                            <Menu
                                items={currentUser ? userMenu : MENU_ITEMs}
                                onChange={handleMenuChange}
                                onClick={toggle}
                            >
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://tse3.mm.bing.net/th?id=OIP.1t0yqXqVIbHOgylnja4pdQHaHa&pid=Api&P=0"
                                    alt="Nguyen Van A"
                                />
                            </Menu>
                            {/* <ModalPopup isShowing={isShowing}> */}
                            {/* <SignUp toggle={toggle}></SignUp> */}
                            {/* <Login toggle={toggle}></Login> */}
                            {/* </ModalPopup> */}
                        </>
                    ) : (
                        <>
                            {/* <Menu
                                items={currentUser ? MENU_ITEMs : userMenu}
                                onChange={handleMenuChange}
                                onClick={toggle}
                            >
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu> */}
                            {/* <ModalPopup isShowing={isShowing}> */}
                            {/* <SignUp toggle={toggle}></SignUp> */}
                            {/* <Login toggle={toggle}></Login>
                            </ModalPopup> */}
                        </>
                    )}

                    <Link style={{ marginLeft: '15px' }} to="/cart">
                        <div className={cx('cartBtn')}>
                            <CartIcon />
                            <span className={cx('numberProInCart')}>{props.cartAr.length}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
const mapStateToProps = (state) => {
    return {
        cartAr: state.cart.cartAr,
    };
};
export default connect(mapStateToProps)(Header);
