import * as TYPES from '../action-types';

let INIT_STATE = {
    cartData: {unpay: [], paid: [], selectAll: true},
};
export default function cart(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        /*Store unpad item in redux*/
        case TYPES.GET_UNPAY_DATA:
            parseFloat(action.result.code) === 0 ? state.cartData.unpay = action.result.data : null;
            state.cartData.unpay = state.cartData.unpay.map(item => {
                return {...item, check: true};
            });
            state.cartData.selectAll = true;
            break;
        /*Store paid item in redux*/
        case TYPES.GET_PAID_DATA:
            parseFloat(action.result.code) === 0 ? state.cartData.paid = action.result.data : null;
            break;
        /*Process item selection*/
        case TYPES.ITEM_SELECT_PROCESS:
            let {mark} = action;
            if (mark === 'all') {
                state.cartData.selectAll = !state.cartData.selectAll;
                state.cartData.unpay.map(item => item.check = state.cartData.selectAll);
            } else {
                state.cartData.unpay.find(item => {
                    return item.id == mark ? item.check = !item.check : null;
                });
                /*查看数组中是不是有未选中的项*/
                let findUncheck = state.cartData.unpay.find(item =>
                    item.check === false
                );
                /*findUncheck为true说明待付款的产品没有被全选(将selecAll属性置为false)，否则就是全都被选中(将selecAll属性置为true)*/
                findUncheck ? state.cartData.selectAll = false : state.cartData.selectAll = true;
            }

    }
    return state;
};