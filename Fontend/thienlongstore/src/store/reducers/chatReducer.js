import actionTypes from '../actions/actionTypes';

const initialState = {
    isOpenChat: false,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_OPEN_CHAT:
            return { ...state, isOpenChat: !state.isOpenChat };
        default:
            return state;
    }
};

export default chatReducer;
