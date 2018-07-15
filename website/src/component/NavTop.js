import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import action from '../store/action/index';

/*ANTD ICON Component*/
import {Icon} from 'antd';

/*Menu Transition*/
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    display: 'none'
}, transitionStyles = {
    entering: {opacity: 0, display: 'none'},
    entered: {opacity: 1, display: 'block'}
};


class NavTop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            in: false
        }
        /*每一次页面刷新都执行dispatch派发方法向服务器拉取最新的购物车数据*/
        let {getUnpay,getPaid}=this.props;
        getUnpay();
        getPaid();
    }

    render() {
        return <header className='headerNavBox'>
            {/*首页一级导航(只在首页显示)*/}
            <div className='homeBox'>
                <div className="baseBox clearfix">
                    <h1 className='logo'>CoolFun</h1>
                    <Icon className='icon' type='bars' style={{
                        fontSize: '.6rem'
                    }} onClick={ev => {
                        this.setState({
                            in: !this.state.in
                        });
                    }}/>
                </div>
                <Transition in={this.state.in} timeout={0}>
                    {state => {
                        return <ul className="filterBox" style={{
                            ...defaultStyle, ...transitionStyles[state],
                            display: this.state.in ? 'block' : 'none'
                        }} onClick={this.productFilter}>
                            <li id='all' type="all"><span>全部商品</span></li>
                            <li id='cpu' type="cpu"><span>CPU</span></li>
                            <li id='board' type="mainboard"><span>主板</span></li>
                            <li id='memory' type="memory"><span>内存</span></li>
                            <li id='hdd' type="hdd"><span>硬盘</span></li>
                            <li id='graph' type="gpu"><span>显卡</span></li>
                            <li id='case' type="case"><span>机箱</span></li>
                            <li id='power' type="power"><span>电源</span></li>
                            <li id='monitor' type="monitor"><span>显示器</span></li>
                        </ul>
                    }}
                </Transition>
            </div>
        </header>
    }

    /*Get specific product based on type*/
    productFilter = (ev) => {
        let target = ev.target,
            tag = target.tagName,
            type = target.getAttribute('type'),
            flag = 'replace',
            {getProductList} = this.props;

        if (tag === 'LI') {
            this.props.history.push('/product');
            getProductList({
                type,
                flag
            })
            /*点击弹出餐单以后自动消失*/
            this.setState({
                in: false
            })
        }


    }

}

export default withRouter(connect(null, {...action.product,...action.cart})(NavTop));