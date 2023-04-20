import actionTypes from '../actions/actionTypes';

const initialState = {
    productList: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT:
            return {
                ...state,
                productList: action.products,
            };
        case actionTypes.GET_ALL_PRODUCT:
            // let data = await axios.get('/api/get-all-products');
            return {
                ...state.productList,
            };
        default:
            return state;
    }
};

export default productReducer;
