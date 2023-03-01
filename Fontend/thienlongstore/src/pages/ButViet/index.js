import classNames from 'classnames/bind';
import Product from '../../components/Product/Product';
import styles from './ButViet.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function ButViet() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`/api/get-products-bycategory?id=1`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);
    return (
        <>
            <div className={cx('product-items', 'row')}>
                {products.map((product, index) => (
                    <Product key={index} data={product} />
                ))}
                {/* <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product /> */}
            </div>
        </>
    );
}

export default ButViet;
