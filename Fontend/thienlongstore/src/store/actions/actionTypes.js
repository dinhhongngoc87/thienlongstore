const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',

    //admin
    // ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    // ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    // PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //CART
    BUY_PRODUCT: 'buy_product',
    DELETE_PRODUCT: 'delete_product',
    CHANGE_QTY: 'change_qty',
    //PRODUCT
    GET_ALL_PRODUCT: 'get_all_product',
    GET_PRODUCTS_BY_CATID: 'get_products_by_catid',
    FETCH_PRODUCT: 'fetch_product',
});

export default actionTypes;
