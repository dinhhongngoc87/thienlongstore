import actionTypes from './actionTypes';
import httpRequest from '../../utils/httpRequest';
export const actFetchProductRequest = () => {
    return (dispatch) => {
        httpRequest.get('/api/get-all-products').then((res) => {
            dispatch(actFetchProduct(res.data.products));
        });
    };
};
export const actFetchProduct = (products) => ({
    type: actionTypes.FETCH_PRODUCT,
    products,
});
