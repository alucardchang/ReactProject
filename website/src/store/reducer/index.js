import {combineReducers} from 'redux';
import home from './home';
import account from './account';
import cart from './cart';
import product from './product';

let reducer = combineReducers({
    home,
    account,
    cart,
    product
});

export default reducer;