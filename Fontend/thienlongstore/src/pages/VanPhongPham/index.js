import classNames from 'classnames/bind';
import Product from '../../components/Product/Product';
import styles from './VanPhongPham.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function VanPhongPham() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`/api/get-products-bycategory?id=2`)
            .then((response) => response.json())
            .then((data) => {
                console.log('CATEGORY: ', data);
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

export default VanPhongPham;
