import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

/*Redux*/
import store from '../../store/index';

/*Dispatch Action*/
import action from '../../store/action/index';

/*API*/
import {logOut} from '../../api/account';

/*ANTD Button and Collapse*/
import {Button, Divider} from 'antd';


class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    /*当第一次组件渲染完成后，根据Redux状态判断是否向服务器请求用户信息数据*/
    componentWillMount() {
        let {accountInfo,getUnpay} = this.props;
        !accountInfo ? this.props.getInfo() : null;
    }

    render() {
        let {accountInfo} = this.props;
        if (!accountInfo) {
            return ''
        }
        let {nick, name, email, phone, residence, address} = accountInfo;
        return <div className='infoBox'>
            <div className='infoHead'>
                <span className='userPic'></span>
                <span className='userName'>{name}</span>
            </div>
            <div className='infoDetail'>
                <Divider orientation="left">所在地区</Divider>
                <p>{residence}</p>
                <Divider orientation="left">收货地址</Divider>
                <p>{address}</p>
                <Divider orientation="left">E-mail</Divider>
                <p>{email}</p>
                <Divider orientation="left">联系电话</Divider>
                <p>{phone}</p>

            </div>
            <div className='buttonBox'>
                <Button type='danger' onClick={async () => {
                    await logOut();
                    this.props.history.push('/account/info');
                    /*当用户退出登录，更新购物车未付款列表*/
                    this.props.getUnpay();
                }}>退出登录</Button>
            </div>
        </div>
    }
}

export default withRouter(connect(state => ({...state.account}), {...action.account,...action.cart})(Info));