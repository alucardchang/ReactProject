import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'http://localhost:8000';  //默认服务器地址与端口号
axios.defaults.withCredentials = true;  //是否允许跨域
axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);
axios.interceptors.response.use(result => result.data);
export default axios;