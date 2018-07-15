/*Axios*/
import axios from './index';

/*Request product list*/
export function queryProductList(payload) {
    return axios.get('/product/list', {
        params: payload
    })
}

/*Request product detail*/
export function queryProductInfo(productID) {
    return axios.get('/product/info', {
        params: {
            productID
        }
    })
}

/*Add product to cart*/
export function addToCart(productID, quantity) {
    return axios.post('/store/add', {
        productID,
        quantity
    })
}

/*Remove product from cart*/
export function removeProduct(productID) {
    return axios.post('/store/remove', {
        productID
    })
}

/*Request cart information*/
export function queryCartInfo(state = 0) {
    return axios.get('/store/info', {
        params: {
            state
        }
    })
}

/*Payment*/
export function queryPayment(storeID) {
    return axios.post('/store/pay', {
        storeID
    })
}

/*Query  product news data from server*/
export function queryNews(){
    return axios.get('/product/news');
}