import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Slidebar from '../components/Slidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from '../../components/Chat';
import { connect } from 'react-redux';
const cx = classNames.bind(styles);
function DefaultLayout(props) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('menu')}>
                    <Sidebar />
                    <Slidebar />
                </div>
                <div className={cx('content')}>{props.children}</div>
            </div>
            <Footer />
            <ToastContainer
                className={cx('toastComponent')}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                theme="light"
            />
            {/* {console.log('from default layout: ', children.props.isOpenChat)} */}
            {props.isOpenChat && <Chat />}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isOpenChat: state.chat.isOpenChat,
    };
};
export default connect(mapStateToProps)(DefaultLayout);
