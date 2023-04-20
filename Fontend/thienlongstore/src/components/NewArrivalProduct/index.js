import className from 'classnames/bind';
import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './NewArrivalProduct.module.scss';
import Slider from 'react-slick';
import Product from '../Product';

const cx = className.bind(styles);

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: '#ccc' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: '#ccc' }} onClick={onClick} />;
}

function NewArrivalProduct() {
    const [newArrials, setNewArrivals] = useState([]);
    const [products, setProducts] = useState([]);
    useLayoutEffect(() => {
        fetch(`/api/new-arrival?limit=15`)
            .then((response) => response.json())
            .then((data) => {
                setNewArrivals(data);
            });
        fetch('/api/get-all-products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
            });
    }, []);
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        nextArrow: <SampleNextArrow className="slick-prev" />,
        prevArrow: <SamplePrevArrow className="slick-next" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <div>
                <Slider {...settings}>
                    {newArrials.map((item, index) => (
                        <Product key={index} data={item} />
                    ))}
                </Slider>
            </div>
        </>
    );
}

export default NewArrivalProduct;
