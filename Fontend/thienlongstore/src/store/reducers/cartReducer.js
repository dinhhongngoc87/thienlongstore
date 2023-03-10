import actionTypes from '../actions/actionTypes';

const initialState = {
    cartAr: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUY_PRODUCT:
            let charge;
            const productIncart = state.cartAr.find((p) => p.id === action.payload.id);
            if (!productIncart) {
                charge = state.cartAr.reduce((acc, current) => {
                    return acc + current.price;
                }, 0);
                console.log('CHARE :', charge);
                return {
                    cartAr: [...state.cartAr, action.payload],
                };
            } else {
                let newCart = state.cartAr;
                const objIndex = newCart.findIndex((obj) => obj.id === action.payload.id);
                newCart[objIndex].totalprice = newCart[objIndex].price;
                if (newCart[objIndex].qty === undefined) {
                    newCart[objIndex].qty = 2;
                    newCart[objIndex].totalprice *= 2;
                } else {
                    newCart[objIndex].qty += 1;
                    newCart[objIndex].totalprice *= newCart[objIndex].qty;
                }

                // charge = newCart.reduce((acc, current) => {
                //     return acc + current.qty * current.price;
                // }, 0);
                return {
                    cartAr: [...newCart],
                };
            }
        case actionTypes.DELETE_PRODUCT:
            let newCart = state.cartAr;
            const objIndex = newCart.findIndex((obj) => obj.id === action.payload.id);
            newCart.splice(objIndex, 1);
            return { cartAr: [...newCart], totalprice: 0 };
        default:
            return state;
    }
};

export default cartReducer;
