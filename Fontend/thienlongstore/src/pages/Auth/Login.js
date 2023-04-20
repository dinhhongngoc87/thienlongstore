import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleLoginApi } from '../../services/userService';
import Button from '../../components/Button';
import styles from './Login.module.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import { Eye, EyeSlash } from '../../components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);
function Login({ toggle }) {
    const userReducer = useSelector((state) => state.user.userReducer);
    const dispatch = useDispatch();
    const userRef = useRef();
    const navigate = useNavigate();
    // const [success, setSuccess] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
        isShowPassword: false,
        errMessage: '',
    });

    useEffect(() => {
        userRef.current.focus();
    }, []);
    //HANDLE INTERACTION
    const handleOnchangeEmail = (e) => {
        setState({
            ...state,
            email: e.target.value,
        });
    };
    const handleOnchangePassword = (e) => {
        setState({
            ...state,
            password: e.target.value,
        });
    };
    const handleShowHidePassword = () => {
        setState({
            ...state,
            isShowPassword: !state.isShowPassword,
        });
    };
    //HANDLE LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setSuccess(true);
        // await userService.handleLogin(state.email, state.password);
    };
    const handleLogin = async () => {
        setState({
            ...state,
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(state.email, state.password);
            if (data.data && data.data.errCode !== 0) {
                setState({
                    ...state,
                    errMessage: data.data.message,
                });
            }
            if (data.data && data.data.errCode === 0) {
                if (data.data.user.user.email) {
                    // dispatch(userReducer.userLoginSuccess(data.data.user.user));
                    localStorage.setItem('user', data.data.user.user.email);
                    localStorage.setItem('user_id', data.data.user.user.id);
                }
                toast.success('Login successfully', {
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
                    navigate('/');
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
        <>
            {/* {success ? (
                <session>
                    <h1>You are logged in !</h1>
                    <br></br>
                    <p>
                        <Link to="/">Go to home</Link>
                    </p>
                </session>
            ) : ( */}
            <div className={cx('wrapper')}>
                <form onSubmit={handleSubmit} className={cx('form')} method="POST">
                    <h3 className={cx('title')}>Đăng nhập</h3>

                    <div className={cx('email')}>
                        <input
                            ref={userRef}
                            onChange={handleOnchangeEmail}
                            id="email"
                            value={state.email}
                            name="email"
                            type="text"
                            placeholder="Địa chỉ email"
                        />
                    </div>
                    <div className={cx('password')}>
                        <input
                            onChange={handleOnchangePassword}
                            id="password"
                            type={state.isShowPassword ? 'text' : 'password'}
                            name="password"
                            value={state.password}
                            placeholder="Mật khẩu"
                        />
                        <span onClick={handleShowHidePassword}>
                            {state.isShowPassword ? (
                                <Eye className={cx('eye-icon')} />
                            ) : (
                                <EyeSlash className={cx('eye-icon')} />
                            )}
                        </span>
                    </div>
                    <div className={cx('col-12')} style={{ color: 'red' }}>
                        {state.errMessage}
                    </div>
                    <Button outline onClick={handleLogin} className={cx('submit')} type="submit">
                        Đăng nhập
                    </Button>

                    <p className={cx('form-footer')}>
                        Bạn chưa có tài khoản? &nbsp; <Link to="/signup">Đăng ký</Link>
                    </p>
                    <p>Hoặc đăng nhập bằng </p>
                    <Button className={cx('google')} extraLarge>
                        Google
                    </Button>
                    <Button className={cx('facebook')} extraLarge>
                        Facebook
                    </Button>
                </form>
                <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" />
                <></>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
