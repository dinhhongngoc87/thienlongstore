import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Slidebar from '../components/Slidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('menu')}>
                    <Sidebar />
                    <Slidebar />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
            <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="light" />
        </div>
    );
}

export default DefaultLayout;
