/*Action types*/
import * as TYPES from '../action-types';

import {queryProductList,queryNews} from "../../api/product";
import {queryRecommend} from "../../api/home";


let product = {
    /*Get list for product list*/
    getProductList(payload = {}) {
        let {limit = 10, page = 1, type = 'all', flag = 'push', productType} = payload;
        return async dispatch => {
            let result = await queryProductList({
                limit,
                page,
                type
            });
            dispatch({
                type: TYPES.GET_RRODUCT_LIST_DATA,
                result, //服务器返回的数据
                flag,
                productType: type
            })
        }
    },
    /*Get product news*/
    getProductNews(){
        return async dispatch => {
            let newsResult = await queryNews();
            dispatch({
                type: TYPES.GET_NEWS_DATA,
                newsResult
            })
        }
    }


};

export default product