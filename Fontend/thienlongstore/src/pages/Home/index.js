import classNames from 'classnames/bind';
import Product from '../../components/Product/Product';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/get-all-products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
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

export default Home;
