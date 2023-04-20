import styles from './Slick.module.scss';
import classNames from 'classnames/bind';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
const cx = classNames.bind(styles);
function Slick({ sliderImages }) {
    return (
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
