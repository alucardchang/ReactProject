import React from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';

/*ANTD ICON Component*/
import {Icon} from 'antd';

class NavFooter extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <footer className='footerNavBox'>
            <NavLink exact to='/'><Icon type='home'/><span>首页</span></NavLink>
            <NavLink to='/news'><Icon type='tag-o'/><span>新品资讯</span></NavLink>
            <NavLink to='/cart'><Icon type='shopping-cart'/><span>购物车</span></NavLink>
            <NavLink to='/account'><Icon type='user'/><span>个人账户</span></NavLink>
        </footer>
    }
}

export default withRouter(connect()(NavFooter));