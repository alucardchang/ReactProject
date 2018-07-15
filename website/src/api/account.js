/*axios*/
import axios from './index';

//Verify user login or not
export function checkLogin() {
    return axios.get('/personal/login');
}

//Logout
export function logOut() {
    return axios.get('/personal/out');
}

//getInfo
export function queryInfo() {
    return axios.get('/personal/info');
}

//Login
export function logIn(payload) {
    return axios.post('/personal/login', payload);
}

//Register
export function register(payload) {
    return axios.post('/personal/register', payload);
}

