import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

/*Redux*/
import action from '../../store/action/'

/*md5 for password encryption*/
import md5 from 'blueimp-md5';

/*API*/
import {register} from '../../api/account'

/*ANTD Form Component*/
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {Modal} from "antd/lib/index";

const FormItem = Form.Item;
// const Option = Select.Option;

/*地区数据*/
const residences = [
    {
        value: '上海',
        label: '上海',
        children: [{
            value: '上海',
            label: '上海'
        }],
    },
    {
        value: '北京',
        label: '北京',
        children: [{
            value: '北京',
            label: '北京'
        }],
    }, {
        value: '浙江',
        label: '浙江',
        children: [{
            value: '杭州',
            label: '杭州',
        }, {
            value: '嘉兴',
            label: '嘉兴',
        }, {
            value: '丽水',
            label: '丽水',
        }],
    }, {
        value: '广东',
        label: '广东',
        children: [{
            value: '深圳',
            label: '深圳',
        }, {
            value: '江门',
            label: '江门',
        }, {
            value: '珠海',
            label: '珠海',
        }, {
            value: '中山',
            label: '中山',
        }],
    }
];


class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            /*密码脏值*/
            confirmDirty: false,
        }
    }


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };


        return <div className='regBox'>
            <Form onSubmit={this.handleSubmit}>
                {/*用户名*/}
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入用户名!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                {/*密码*/}
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请设置密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                {/*确认密码*/}
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                {/*所在地区*/}
                <FormItem
                    {...formItemLayout}
                    label="所在地区"
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['上海', '上海'],
                        rules: [{type: 'array', required: true, message: 'Please select your habitual residence!'}],
                    })(
                        <Cascader options={residences}/>
                    )}
                </FormItem>
                {/*收货地址*/}
                <FormItem
                    {...formItemLayout}
                    label="收货地址"
                >
                    {getFieldDecorator('address', {
                        rules: [{required: true, message: '请输入收货地址!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                {/*邮箱地址*/}
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '无效的E-mail地址!',
                        }, {
                            required: true, message: '请输入E-mail地址!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                {/*联系电话*/}
                <FormItem
                    {...formItemLayout}
                    label="联系电话"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入联系电话!'}],
                    })(
                        <Input style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
        </div>
    }

    /*注册按钮点击事件*/
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values);
                values.residence=values.residence[0]+'/'+values.residence[1];
                values.password=md5(values.password);
                let result=await register(values);
                if(result.code===0){
                    this.props.getInfo();
                    this.props.history.push('/account');
                    return;
                }
                this.regFail();
            }
        });
    }

    /*两次密码一致性校验*/
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次设置的密码不一致!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    /*弹出登录失败提示框*/
    regFail = () => {
        const modal = Modal.error({
            title: '注册失败!',
            content: '目前服务器繁忙，请稍等片刻',
        });
        setTimeout(() => modal.destroy(), 1500);
    };
}

export default withRouter(Form.create()(connect(null,action.account)(Register)));