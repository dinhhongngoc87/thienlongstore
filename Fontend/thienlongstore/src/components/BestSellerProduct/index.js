import className from 'classnames/bind';
import { useEffect, useLayoutEffect, useState } from 'react';
import styles from './BestSellerProduct.module.scss';
import Slider from 'react-slick';
import Product from '../Product';
import { connect } from 'react-redux';
import httpRequest from '../../utils/httpRequest';

const cx = className.bind(styles);

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: '#ccc' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: '#ccc' }} onClick={onClick} />;
}

function BestSellerProduct(props) {
    const [topProducts, setTopProduct] = useState([{}]);
    let data = [];
    useLayoutEffect(() => {
        fetch(`/api/top-seller?limit=15`)
            .then((response) => response.json())
            .then((data) => {
                setTopProduct(data);
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
                    {topProducts.forEach((product) => {
                        props.productsRedux.forEach((p, index) => (product.product_Id === p.id ? data.push(p) : null));
                    })}
                    {data.map((item, index) => (
                        <Product key={index} data={item} />
                    ))}
                </Slider>
                {/* {console.log('product redux: ', props.productsRedux)} */}
            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        productsRedux: state.product.productList,
    };
};

export default connect(mapStateToProps)(BestSellerProduct);
