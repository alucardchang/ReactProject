import * as TYPES from '../action-types';

let INIT_STATE = {
    accountInfo: null,
};
export default function account(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    let payload = {};
    switch (action.type) {
        /*获取用户信息*/
        case TYPES.GET_INFO:
            payload = action.payload;
            parseFloat(payload.code) === 0 ? state.accountInfo = payload.data : null;
            break;
    }
    return state;
};