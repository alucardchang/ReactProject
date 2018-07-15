import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logIn} from '../../api/account';

/*Redux*/
import action from '../../store/action/index'

/*md5 for password encryption*/
import md5 from 'blueimp-md5';

/*ANTD Component*/
import {Form, Icon, Input, Button, Modal} from 'antd';

const FormItem = Form.Item;


class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        // console.log(this.props.account);
        const {getFieldDecorator} = this.props.form;
        return <div className='tipBox'>
            <span className='headPic'></span>
            <div className='formBox'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入用户名!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit" className='loginBtn'>登录</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className='regBtn' onClick={() => {
                            this.props.history.push('/account/register')
                        }}>注册</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    }


    /*登录按钮点击事件*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.password = md5(values.password);
                let result = await logIn(values);
                if (result.code === 0) {
                    let {getInfo, getUnpay, getPaid} = this.props;
                    /*如果登录成功，则向服务器请求当前登录用户的个人信息更新当前的Redux容器状态中的用户信息*/
                    getInfo();
                    /*获取对应用户购物车信息*/
                    getUnpay();
                    getPaid();
                    this.props.history.go(-1);
                    return;
                }
                this.loginFail();
            }
        })
    };


    /*弹出登录失败提示框*/
    loginFail = () => {
        const modal = Modal.error({
            title: '登录失败!',
            content: '用户名或密码错误，请尝试重新登录',
        });
        setTimeout(() => modal.destroy(), 1500);
    };


}

export default withRouter(Form.create()(connect(null, {...action.account, ...action.cart})(Login)));