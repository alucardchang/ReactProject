import * as TYPES from '../action-types';
import {queryInfo} from '../../api/account';


let account = {
    /*获取用户信息*/
    getInfo() {
        return {
            type: TYPES.GET_INFO,
            payload: queryInfo()
        }
    }
}


export default account;



