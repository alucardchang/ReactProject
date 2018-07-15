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
import {Button, Collapse} from 'antd';

const Panel = Collapse.Panel;


class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    /*当第一次组件渲染完成后，根据Redux状态判断是否向服务器请求用户信息数据*/
    componentWillMount() {
        let {accountInfo}=this.props;
        !accountInfo?this.props.getInfo():null;
    }

    render() {
        let {accountInfo}=this.props;
        if(!accountInfo){
            return ''
        }
        let {nick,name,email,phone}=accountInfo;
        console.log(accountInfo);
        return <div className='infoBox'>
            <div className='infoHead'>
                <span className='userPic'></span>
                <span className='userName'>{nick}</span>
            </div>
            <div className='infoDetail'>
                <Collapse accordion>
                    <Panel header="所在地区" key="1">
                        <p>中国</p>
                    </Panel>
                    <Panel header="收货地址" key="2">
                        <p>暂未填写</p>
                    </Panel>
                    <Panel header="E-mail" key="3">
                        <p>{email}</p>
                    </Panel>
                    <Panel header="联系电话" key="4">
                        <p>{phone}</p>
                    </Panel>
                </Collapse>
            </div>
            <div className='buttonBox'>
                <Button type='danger' onClick={async () => {
                    await logOut();
                    this.props.history.push('/account/info');
                }}>退出登录</Button>
            </div>
        </div>
    }
}

export default withRouter(connect(state => ({...state.account}), action.account)(Info));