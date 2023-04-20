import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer';
import userReducer from './userReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import cartReducer from './cartReducer';
import productReducer from './productReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo'],
};
const cartPersistConfig = {
    ...persistCommonConfig,
    key: 'cart',
    whitelist: ['cartAr'],
};
const productPersistConfig = {
    ...persistCommonConfig,
    key: 'product',
    whitelist: ['productList'],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (history) =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        user: persistReducer(userPersistConfig, userReducer),
        cart: persistReducer(cartPersistConfig, cartReducer),
        product: persistReducer(productPersistConfig, productReducer),
    });
