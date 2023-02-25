import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Button from '../../components/Button';
import axios from 'axios';
const cx = classNames.bind(styles);
function SignUp({ toggle }) {
    const handleSubmit = () => {};
    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit} action="/post-crud" className={cx('form')} method="post">
                <h3 className={cx('title')}>Sign up to flexOffice</h3>
                <div className={cx('userName')}>
                    <input type="text" className={cx('firstName')} name="firstName" placeholder="Họ"></input>
                    <input type="text" className={cx('lastName')} name="lastName" placeholder="Tên"></input>
                </div>
                <div className={cx('email')}>
                    <input id="email" type="text" name="email" placeholder="Địa chỉ Email" />
                </div>
                <div className={cx('password')}>
                    <input type="password" placeholder="Mật khẩu" name="password" />
                    <input type="password" placeholder="Nhập lại mật khẩu" />
                </div>
                <input type="text" name="roleId" value="R2" hidden readOnly />
                <Button outline extraLarge className={cx('signup')} type="text">
                    Đăng ký
                </Button>
                <div className={cx('form-footer')}>
                    Already have an account? &nbsp; <Link to="/login">Log In</Link>
                </div>
                <p>Hoặc đăng nhập bằng </p>
                <Button className={cx('google')} extraLarge>
                    Google
                </Button>
                <Button className={cx('facebook')} extraLarge>
                    Facebook
                </Button>
            </form>
        </div>
    );
}

export default SignUp;
