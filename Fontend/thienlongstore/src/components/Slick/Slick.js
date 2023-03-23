import styles from './Slick.module.scss';
import classNames from 'classnames/bind';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
const cx = classNames.bind(styles);
function Slick({ sliderImages }) {
    // const settings = {
    //     customPaging: (i) => {
    //         return (
    //                 <img alt='none' className={cx("thumb")} src={sliderImages[i]} />
    //         );
    //     },
    //     dots: true,
    //   dotsClass: "slick-dots slick-thumb",
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows:false,

    // };
    return (
        // <div>
        //     <Slider {...settings} className={cx('slider')}>
        //         {sliderImages.map((sliderImage,index)=>(
        //             <div key={index} >
        //                 <img className={cx("sliderImage")} alt="img" src={sliderImage} />
        //             </div>
        //         )

        //         )}
        //     </Slider>
        // </div>

        <Carousel>
            {sliderImages.map((sliderImage, index) => (
                <Carousel.Item key={index}>
                    <img className="d-block w-100" src={`http://localhost:3000/${sliderImage}`} alt="" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Slick;
