import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Button from '../../components/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from '../../components/Icons';
import { handleSignUpApi } from '../../services/userService';

const cx = classNames.bind(styles);
function SignUp({ toggle }) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
        isShowPassword: false,
        errMessage: '',
    });
    const handleOnchange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    const handleShowHidePassword = () => {
        setState({
            ...state,
            isShowPassword: !state.isShowPassword,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({
            ...state,
            errMessage: '',
        });

        console.log(state);
        try {
            let data = await handleSignUpApi(
                state.firstName,
                state.lastName,
                state.email,
                state.password1,
                state.password2,
            );
            if (data.data && data.data.errCode !== 0) {
                setState({
                    ...state,
                    errMessage: data.data.message,
                });
            }
            if (data.data && data.data.errCode === 0) {
                toast.success('Sign up successfully', {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    setState({
                        ...state,
                        errMessage: e.response.data.message,
                    });
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <h3 className={cx('title')}>Sign up to flexOffice</h3>
                <div className={cx('userName')}>
                    <input
                        type="text"
                        className={cx('firstName')}
                        name="firstName"
                        placeholder="Họ"
                        onChange={(e) => handleOnchange(e)}
                    ></input>
                    <input
                        type="text"
                        className={cx('lastName')}
                        name="lastName"
                        placeholder="Tên"
                        onChange={(e) => handleOnchange(e)}
                    ></input>
                </div>
                <div className={cx('email')}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Địa chỉ Email"
                        onChange={(e) => handleOnchange(e)}
                    />
                </div>
                <div className={cx('password')}>
                    <input
                        onChange={(e) => handleOnchange(e)}
                        id="password1"
                        type={state.isShowPassword ? 'text' : 'password'}
                        name="password1"
                        value={state.password1}
                        placeholder="Mật khẩu"
                    />
                    <span onClick={handleShowHidePassword}>
                        {state.isShowPassword ? (
                            <Eye className={cx('eye-icon')} />
                        ) : (
                            <EyeSlash className={cx('eye-icon')} />
                        )}
                    </span>
                    <input
                        name="password2"
                        value={state.password2}
                        onChange={(e) => handleOnchange(e)}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                    />
                </div>
                <input type="text" name="roleId" value="R2" hidden readOnly />
                <div className={cx('col-12')} style={{ color: 'red' }}>
                    {state.errMessage}
                </div>
                <Button outline extraLarge className={cx('signup')} onClick={handleSubmit}>
                    Đăng ký
                </Button>
                <div className={cx('form-footer')}>
                    Bạn đã có tài khoản? &nbsp; <Link to="/login">Đăng nhập</Link>
                </div>
                <p>Hoặc đăng nhập bằng </p>
                <Button className={cx('google')} extraLarge>
                    Google
                </Button>
                <Button className={cx('facebook')} extraLarge>
                    Facebook
                </Button>
            </form>
            <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" />
        </div>
    );
}

export default SignUp;
