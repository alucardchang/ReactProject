import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link, Redirect} from 'react-router-dom';

/*Dispatch action*/
import action from '../store/action/index'

/*Page Component*/
import Paid from './cart/Paid';
import Unpay from './cart/Unpay';

/*ANTD Component*/
import {Menu} from 'antd';

/*CSS*/
import '../static/css/cart.less'

class Cart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current: this.props.location.pathname==='/cart/paid'?'paid':'unpay',
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        this.props.history.push(`/cart/${e.key}`);

    }


    render() {
        return <section className='cartListContainer'>
            <Menu
                className={'menuBox'}
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="unpay" onClick={this.handleClick}>
                    待付款
                </Menu.Item>
                <Menu.Item key="paid"  onClick={this.handleClick}>
                    已付款
                </Menu.Item>
            </Menu>
            <Switch>
                <Route path='/cart/' exact component={Unpay}/>
                <Route path='/cart/unpay' component={Unpay}/>
                <Route path='/cart/paid' component={Paid}/>
            </Switch>
        </section>
    }
}

export default connect(null, action.cart)(Cart);