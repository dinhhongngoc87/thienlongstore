import Carousel from 'react-bootstrap/Carousel';
import images from '../../../asset/images';
import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';
const cx = classNames.bind(styles);
function Slidebar() {
    return (
        <Carousel className={cx('wrapper')}>
            <Carousel.Item>
                <img className="d-block w-100" src={images.slidepic.pic1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images.slidepic.pic2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={images.slidepic.pic3} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slidebar;
