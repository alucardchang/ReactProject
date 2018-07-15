import * as TYPES from '../action-types';

import {queryCartInfo} from "../../api/product";


let cart = {
    /*Get unpaid item in shopping cart*/
    getUnpay() {
        return async dispatch => {
            let result = await queryCartInfo(0);
            dispatch({
                type: TYPES.GET_UNPAY_DATA,
                result
            })
        }
    },
    /*Get paid item in shopping cart*/
    getPaid() {
        return async dispatch => {
            let result = await queryCartInfo(1);
            dispatch({
                type: TYPES.GET_PAID_DATA,
                result
            })
        }
    },
    /*Process selection event of item*/
    selectManager(mark){
        return ({
            //@mark为'all'时让所有为支付商品全选或全不选，为一个id时则为对应商品修改checked状态
            type:TYPES.ITEM_SELECT_PROCESS,
            mark
        })

    }
};
export default cart;
