import Header from '../components/Header';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Footer from '../components/Footer';
import Chat from '../../components/Chat';
import { connect } from 'react-redux';
const cx = classNames.bind(styles);
function HeaderOnly(props) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{props.children}</div>
            </div>
            <Footer />
            {console.log('From header only isopenchat: ', props.isOpenChat)}
            {props.isOpenChat && <Chat />}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        isOpenChat: state.chat.isOpenChat,
    };
};
export default connect(mapStateToProps)(HeaderOnly);
