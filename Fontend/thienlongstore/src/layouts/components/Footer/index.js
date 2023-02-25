import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '../../../asset/images';
import { FBIcon, MessengerIcon } from '../../../components/Icons';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('col-4')}>
                    <img alt="footerimage" src={images.footerImage} />
                    <p>
                        <b>Flexoffice.com - Website thương mại điện tử thuộc Tập đoàn Thiên Long</b>
                    </p>
                    <br />
                    <p>
                        Công ty Cổ Phần Tập Đoàn Thiên Long GPĐKKD số 0301464830 do Sở KHĐT TP. Hồ Chí Minh cấp ngày
                        04/03/2005. Head Office: Tầng 10, Sofic Tower, Số 10 Đường Mai Chí Thọ, Phường Thủ Thiêm, Thành
                        Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam
                    </p>
                    <br/>
                    <p>2021 © Flexoffice.com - Bản quyền thuộc Tập đoàn Thiên Long</p>
                </div>
                <div className={cx('col-3')}>
                    <h2>
                        <b>HỖ TRỢ KHÁCH HÀNG</b>
                    </h2>
                    <h3>Hotline:1900 866 819</h3>
                    <h3>salesonline@thienlongvn.com</h3>
                    <ul>
                        <li>-Hướng dẫn mua hàng</li>
                        <li>Hướng dẫn thanh toán</li>
                        <li>Chính sách giao hàng</li>
                        <li>Chính sách đổi trả & hoàn tiền</li>
                        <li>Khách hàng thân thiết</li>
                    </ul>
                </div>
                <div className={cx('col-2')}>
                    <h2>
                        <b>VỀ FLEXOFFICE</b>
                    </h2>
                    <ul>
                        <li>-Giới thiệu</li>
                        <li>-Dịch vụ in ấn quảng cáo</li>
                        <li>-Chính sách bảo mật</li>
                        <li>-Thông tin liên hệ</li>
                    </ul>
                </div>
                <div className={cx('col-3', 'social-footer')}>
                    <h2>
                        <b>LIÊN KẾT VỚI CHÚNG TÔI</b>
                    </h2>
                    <FBIcon fill={'#1f428a'} />
                    <MessengerIcon fill={'#1a94ff'} />
                </div>
            </div>
        </div>
    );
}

export default Footer;
