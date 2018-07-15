import React from 'react';
import {connect} from 'react-redux';
import Qs from 'qs';

/*Dispatch action*/
import action from '../../store/action/index'

/*API*/
import {queryProductInfo, addToCart} from "../../api/product";

/*ANTD Component*/
import {Divider, Icon, Button, Tag, InputNumber, message} from 'antd';


class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            isProcessing: false
        }
    }

    async componentDidMount() {
        let {location: {search}} = this.props,
            searchObj = Qs.parse(search.substr(1)),
            productID = parseFloat(searchObj.productID) || 0,
            result = await queryProductInfo(productID);
        parseFloat(result.code) === 0 ? this.setState({
            data: result.data
        }): null;
    }

    componentWillReceiveProps(){
        console.log(1);

    }

    render() {
        let {data} = this.state;
        if (!data) return '';
        /*将productID挂载到当前实例的属性中供cartEvent方法调用*/
        this.productID = data.id;
        return <div className='detailBox'>
            <Tag color="green">{this.getListTitle()}</Tag>
            <h2>{data.name}</h2>
            <Divider/>
            <div className='productImg'>
                <Icon type="left-circle-o" className='backIcon' onClick={() => {
                    this.props.history.go(-1)
                }}/>
                <img src={data.pic} alt={data.name}/>
            </div>
            <div className='productDesc'>{data.dec}</div>
            <div className='priceContainer'>
                {/*Price show*/}
                <span className='priceTitle'>参考价</span>
                &nbsp;&nbsp;
                <span className='price'>￥{data.price}</span>
                {/*Quantity input*/}
                <div className='quantityBox'>
                    <span>数量</span>
                    &nbsp;&nbsp;
                    <InputNumber ref='quantityInput' size='small' min={1} max={100} defaultValue={1}
                                 onChange={this.onChange}/>
                </div>
                {/*Button show*/}
                <Button type='danger' icon="shopping-cart"
                        onClick={this.cartEvent.bind(this, this.productID)}>加入购物车</Button>
            </div>

            <Divider/>
            <p>增值服务</p>
            <span className='serverTag'><Icon type="customer-service"/>24小时客服热线</span>
            <span className='serverTag'><Icon type="tool"/>3年质保</span>
        </div>
    }

    /*Display list title based on product type*/
    getListTitle() {
        let {type} = this.state.data,
            text = '全部商品';
        switch (type) {
            case 'cpu':
                text = 'CPU';
                break;
            case 'mainboard':
                text = '主板';
                break;
            case 'memory':
                text = '内存';
                break;
            case 'hdd':
                text = '硬盘';
                break;
            case 'gpu':
                text = '显卡';
                break;
            case 'case':
                text = '机箱';
                break;
            case 'power':
                text = '电源';
                break;
            case 'monitor':
                text = '显示器';
                break;
        }
        return text;
    }

    /*Input number on change*/
    onChange(value) {
        console.log('changed', value);
    }

    /*Add to cart event*/
    cartEvent = async productID => {
        /*防止服务器繁忙时用户频繁点击*/
        if (this.state.isProcessing) return;
        this.state.isProcessing = true;
        /*获取数量输入框的值并将其转换为数字*/
        let quantity = parseFloat(this.refs.quantityInput.inputNumberRef.input.value),
            result = await addToCart(productID, quantity),
            {getUnpay} = this.props;
        if (parseFloat(result.code) === 0) {
            /*当有新的商品添加到购物车以后，要派发一个getUnpay行为，从服务器拉取最新的待付款产品信息到redux中*/
            getUnpay();
            this.success('This is a message of success');
            this.state.isProcessing = false;
            return;
        }
        this.error('This is a message of success');

    }

    /*Success message of adding to cart */
    success = () => {
        message.success('成功加入购物车');
    };
    /*Error message of adding to cart */
    error = () => {
        message.error('服务器正忙，请稍后再试');
    };

}

export default connect(null, action.cart)(Info);