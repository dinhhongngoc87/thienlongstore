import classNames from 'classnames/bind';
import Product from '../../components/Product/Product';
import styles from './DungCuHocTap.module.scss';
import prices from '../../asset/dataset/product-price';
import { useState, useEffect, useCallback } from 'react';
import Checkbox from '../../components/Checkbox';
import { connect } from 'react-redux';
const cx = classNames.bind(styles);
const initFilter = {
    price: '0',
};
function DungCuHocTap(props) {
    const listProduct = props.productsRedux.filter((p) => p.catId === 3);
    const [products, setProducts] = useState(listProduct);
    const [filter, setFilter] = useState(initFilter);
    const [sort, setSort] = useState('');

    const filterSelect = (type, checked, item) => {
        if (checked) {
            // if checked === true
            switch (type) {
                case 'PRICE':
                    setFilter({
                        ...filter,
                        price: item.code,
                    });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'PRICE':
                    setFilter({ ...filter, price: initFilter.price });
                    break;
                default:
            }
        }
    };

    const updateProducts = useCallback(() => {
        let temp = listProduct;
        if (filter.price) {
            switch (filter.price) {
                case '1':
                    temp = temp.filter((p) => parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) < 100000);
                    break;
                case '12':
                    temp = temp.filter(
                        (p) =>
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) >= 100000 &&
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) <= 200000,
                    );
                    break;
                case '23':
                    temp = temp.filter(
                        (p) =>
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) >= 200000 &&
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) <= 300000,
                    );
                    break;
                case '35':
                    temp = temp.filter(
                        (p) =>
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) >= 300000 &&
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) <= 500000,
                    );
                    break;
                case '510':
                    temp = temp.filter(
                        (p) =>
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) >= 500000 &&
                            parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) <= 1000000,
                    );
                    break;
                case '10':
                    temp = temp.filter((p) => parseFloat(p.price) * (1 - parseFloat(p.discount) / 100) >= 1000000);
                    break;
                default:
            }
        }
        setProducts(temp);
    }, [filter]);

    const clearFilter = () => {
        setFilter(initFilter);
    };

    const handleSelectSort = (e) => {
        setSort(e.target.value);
    };
    const sortProduct = useCallback(() => {
        let temp = products;
        switch (sort) {
            case 'undefined':
                temp = listProduct;
                break;
            case 'decrease':
                temp = products.sort(
                    (a, b) =>
                        parseFloat(b.price) * (1 - parseFloat(b.discount) / 100) -
                        parseFloat(a.price) * (1 - parseFloat(a.discount) / 100),
                );
                console.log('decrease', temp);
                break;
            case 'increase':
                temp = products.sort(
                    (a, b) =>
                        parseFloat(a.price) * (1 - parseFloat(a.discount) / 100) -
                        parseFloat(b.price) * (1 - parseFloat(b.discount) / 100),
                );
                console.log('increase', temp);

                break;
            default:
        }

        setProducts(temp);
    }, [sort]);

    useEffect(() => {
        sortProduct();
    }, [sortProduct]);
    useEffect(() => {
        updateProducts();
    }, [updateProducts]);
    return (
        <>
            {console.log(products)}
            <div className={cx('product-container')}>
                <select className={cx('select-sorter')} onChange={handleSelectSort}>
                    <option key={0} value={'undefined'} defaultValue>
                        --Sắp xếp--
                    </option>
                    <option key={1} value={'increase'}>
                        Giá tăng dần
                    </option>
                    <option key={2} value={'decrease'}>
                        Giá giảm dần
                    </option>
                </select>
                <div className={cx('product-list')}>
                    <div className={cx('filter-container')}>
                        <div className={cx('filter-price')}>
                            <h3>Giá</h3>
                            {prices.map((item, index) => (
                                <div key={index} className={cx('filter-item')}>
                                    <Checkbox
                                        label={item.display}
                                        checked={item.code === filter.price}
                                        onChange={(input) => filterSelect('PRICE', input.checked, item)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className={cx('clear-filter')} onClick={clearFilter}>
                            Xóa bộ lọc
                        </button>
                    </div>
                    <div className={cx('grid-container')}>
                        {products &&
                            products.map((product, index) => {
                                return <Product key={index} data={product} />;
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        productsRedux: state.product.productList,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DungCuHocTap);
