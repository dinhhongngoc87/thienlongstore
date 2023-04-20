import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';
import images from '../../../asset/images';
const cx = classNames.bind(styles);
function Slidebar() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <Slider {...settings}>
                    <div>
                        <img className="d-block w-100" src={images.slidepic.pic1} alt="First slide" />
                    </div>
                    <div>
                        <img className="d-block w-100" src={images.slidepic.pic2} alt="Second slide" />
                    </div>
                    <div>
                        <img className="d-block w-100" src={images.slidepic.pic3} alt="Third slide" />
                    </div>
                </Slider>
            </div>
        </>

        // <Carousel className={cx('wrapper')}>
        //     <Carousel.Item>
        //         <img className="d-block w-100" src={images.slidepic.pic1} alt="First slide" />
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img className="d-block w-100" src={images.slidepic.pic2} alt="Second slide" />
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img className="d-block w-100" src={images.slidepic.pic3} alt="Third slide" />
        //     </Carousel.Item>
        // </Carousel>
    );
}

export default Slidebar;
