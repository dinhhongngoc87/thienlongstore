import actionTypes from '../actions/actionTypes';

const initialState = {
    cartAr: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUY_PRODUCT:
            //find if product is exist
            if (!action.payload.data) {
                const productIncart = state.cartAr.find((p) => p.id === action.payload.id);
                if (!productIncart) {
                    action.payload.qtyIncart = 1;
                    return {
                        cartAr: [...state.cartAr, action.payload],
                    };
                } else {
                    let newCart = state.cartAr;
                    const objIndex = newCart.findIndex((obj) => obj.id === action.payload.id);
                    newCart[objIndex].qtyIncart += 1;
                    return {
                        cartAr: [...newCart],
                    };
                }
            } else {
                const productIncart = state.cartAr.find((p) => p.id === action.payload.data.id);
                if (!productIncart) {
                    action.payload.data.qtyIncart = 1;
                    return {
                        cartAr: [...state.cartAr, action.payload.data],
                    };
                } else {
                    let newCart = state.cartAr;
                    const objIndex = newCart.findIndex((obj) => obj.id === action.payload.data.id);
                    newCart[objIndex].qtyIncart += action.payload?.AdditionalQty || 1;
                    return {
                        cartAr: [...newCart],
                    };
                }
            }
        case actionTypes.DELETE_PRODUCT:
            let newCart = state.cartAr;
            const objIndex = newCart.findIndex((obj) => obj.id === action.payload.id);
            newCart.splice(objIndex, 1);
            return { cartAr: [...newCart], totalprice: 0 };
        case actionTypes.CHANGE_QTY:
            let newCart1 = state.cartAr;
            const obj = newCart1.find((obj) => obj.id === action.payload.product.id);
            obj.qtyIncart = parseInt(action.payload.qty);

            return { cartAr: [...newCart1], totalprice: 0 };
        default:
            return state;
    }
};

export default cartReducer;
