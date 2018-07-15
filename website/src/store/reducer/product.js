/*Action Type*/
import * as TYPES from '../action-types';

let INIT_STATE = {
    productListData: {
        total: null,
        limit: null,
        page: null,
        data: [],
        flag: 'push',
        productType: 'all'
    },
    newsData:null
};
export default function product(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    let payload = {};
    switch (action.type) {
        case TYPES.GET_RRODUCT_LIST_DATA:
            /*action返回的是
            *   type: TYPES.GET_RRODUCT_LIST_DATA,
                result,
                flag,
                productType
            * */
            payload = action;
            let {result, flag, productType} = payload,
                /*result是服务器返回的数据
                *code:0,
                 msg:'xxx',
                 total:100,
                 limit:10,
                 page:1,
                 data:[
                {...},
                 ...
                ]
                * */
                {total, limit, page, data} = result;
            if (result.code === 0) {
                state.productListData.total = parseFloat(total);
                state.productListData.limit = parseFloat(limit);
                state.productListData.page = parseFloat(page);
                state.productListData.productType = productType;
                /*如果flag值为push则是原有产品数据数组数组拼接新的返回产品数据数组，否则的话就是将筛选出的产品数据数组覆盖原有产品数据数组*/
                state.productListData.data = flag === 'push' ? state.productListData.data.concat(result.data) : result.data;
            }
            break;
        case TYPES.GET_NEWS_DATA:
            payload=action;
            let {newsResult}=payload;
            state.newsData=newsResult.code===0?newsResult.data:null;
    }
    return state;
};