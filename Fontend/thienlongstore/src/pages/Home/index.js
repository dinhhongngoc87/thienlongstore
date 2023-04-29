import Product from '../../components/Product/Product';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';
import Image from '../../components/Image';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BestSellerProduct from '../../components/BestSellerProduct';
import NewArrivalProduct from '../../components/NewArrivalProduct';
import { actFetchProduct, actFetchProductRequest } from '../../store/actions';
const images = [
    'https://theme.hstatic.net/1000230347/1000782290/14/brand_1.jpg?v=4776',
    'https://theme.hstatic.net/1000230347/1000782290/14/brand_2.jpg?v=4776',
    'https://theme.hstatic.net/1000230347/1000782290/14/brand_3.jpg?v=4776',
    'https://theme.hstatic.net/1000230347/1000782290/14/brand_4.jpg?v=4778',
];

const cx = classNames.bind(styles);
function Home(props) {
    useEffect(() => {
        props.fetchAllProducts();
    }, []);

    return (
        <>
            <div className={cx('row', 'brand-img-list')}>
                {images.map((imageUrl, index) => {
                    return <img key={index} src={imageUrl} alt="image_brand" />;
                })}
            </div>
            <div className={cx('banner')}>
                <Image src="https://theme.hstatic.net/1000230347/1000782290/14/flashsale_img.jpg?v=4778" alt="banner" />
            </div>
            <div className={cx('row')}>
                <h1 style={{ fontFamily: 'Roboto', fontWeight: 400 }}>Sản phẩm bán chạy nhất</h1>
                <BestSellerProduct />
            </div>
            <div className={cx('row')}>
                <h1 style={{ fontFamily: 'Roboto', fontWeight: 400 }}>Sản phẩm mới</h1>
                <NewArrivalProduct />
            </div>
            <div className={cx('product-items')}>
                <div className={cx('grid-container')}>
                    {props.productsRedux.map((product, index) => (
                        <Product key={index} data={product} />
                    ))}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        productsRedux: state.product.productList,
        cartRedux: state.cart.cartAr,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductRequest());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
