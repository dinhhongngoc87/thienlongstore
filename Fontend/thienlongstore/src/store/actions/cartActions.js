import actionTypes from './actionTypes';
//add to cart
export const buyProduct = (product) => {
    return {
        type: actionTypes.BUY_PRODUCT,
        payload: product,
    };
};
//delete from cart
export const deleteProduct = (product) => {
    return {
        type: actionTypes.DELETE_PRODUCT,
        payload: product,
    };
};

//Change quantity of product in cart
export const changeProductQuantity = (data) => {
    return {
        type: actionTypes.CHANGE_QTY,
        payload: data,
    };
};
//fetch all product
export const getAllProduct = () => {
    return {
        type: actionTypes.GET_ALL_PRODUCT,
    };
};
