/*BASIC Component and Plugin*/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import axios from './api/index';
import md5 from 'blueimp-md5';

/*React-Redux Component*/
import store from './store/index';
import {Provider} from 'react-redux';

/*React Router Component*/
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

/*Web Component*/
import NavTop from './component/NavTop';
import NavFooter from './component/NavFooter';
import Home from './routes/Home';
import Product from './routes/Product';
import News from './routes/News';
import Cart from './routes/Cart';
import Account from './routes/Account';

/*Ant Design Component*/
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';  //组件汉化包

/*Common CSS*/
import './static/css/reset.min.css';
import './static/css/common.less';

/*Render*/
render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <div>
                {/*HEADER*/}
                <NavTop/>

                {/*MAIN=>ROUTE*/}
                <main className='container'>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/product" component={Product}/>
                        <Route path="/news" component={News}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/account" component={Account}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>

                {/*FOOTER*/}
                <NavFooter/>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>, root)
