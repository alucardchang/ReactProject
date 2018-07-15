/*import axios*/
import axios from './index';

/*Query banner data from server*/
export function queryBanner(){
    return axios.get('/product/banner');
}

/*Query banner data from server*/
export function queryVideo(){
    return axios.get('/product/video');
}

/*Query recommend product data from server*/
export function queryRecommend(){
    return axios.get('/product/recommend');
}