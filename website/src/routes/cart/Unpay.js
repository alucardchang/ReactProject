import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


/*Dispatch*/
import action from '../../store/action/index';

/*API*/
import {removeProduct, queryPayment} from "../../api/product";
import {checkLogin} from "../../api/account";

/*ANTD Component*/
import {Popconfirm, message, Button, Tag, Alert, Checkbox, Modal} from 'antd';


/*Page Component*/
import {addToCart} from "../../api/product";

const text = '您确定要删除该商品吗?';
const confirm = Modal.confirm;
let confirmRes = null;


class Unpay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isProcessing: false,
            hasCart: false
        }
    }


    render() {
        let {unpay} = this.props.cartData;
        if (unpay.length === 0) {
            return <div className="emptyInfo">
                <Alert message="您当前的购物车竟然是空的" type="info" showIcon/>
                <span className="emptyPic"></span>
            </div>
        }
        return <div>
            <ul className='unpayCartList'>
                <Checkbox className='selAllBox' checked={this.props.cartData.selectAll}
                          onChange={this.props.selectManager.bind(this, 'all')}>全选</Checkbox>
                {unpay.map((item, index) => {
                    // console.log(item);
                    let {id, pic, name, dec, price, quantity, check} = item;
                    return <li key={index}>
                        {/*复选框*/}
                        <Checkbox className='chkBox' checked={check}
                                  onChange={this.props.selectManager.bind(this, id)}/>
                        <Link className='itemContainer' to={`/product/info?productID=${id}`}>
                        <span className="pic">
                            <img src={pic} alt={name}/>
                        </span>
                            <div className='desc'>
                                <p>{name}</p>
                                <p>{dec}</p>
                            </div>
                            <div className='priceQuan'>
                                <span>￥{price}</span>
                                <span className='quantityBox'>数量<Tag>{quantity}</Tag></span>
                            </div>
                        </Link>
                        <Popconfirm ref='delButton' className='delButton' placement="bottomRight" title={text}
                                    onConfirm={this.confirm.bind(this, id)} okText="Yes" cancelText="No">
                            <Button size='small'>删除</Button>
                        </Popconfirm>
                    </li>
                })}
            </ul>
            <Button className='payButton' size='large' onClick={this.paymentManager} type="primary">
                结算
            </Button>
        </div>
    }

    /*Remove cart event*/
    removeEvent = async productID => {
        /*防止服务器繁忙时用户频繁点击*/
        if (this.state.isProcessing) return;
        this.state.isProcessing = true;
        /*获取数量输入框的值并将其转换为数字*/
        let result = await removeProduct(productID),
            {getUnpay} = this.props;
        if (parseFloat(result.code) === 0) {
            /*当有商品从购物车移除，要派发一个getUnpay行为，从服务器拉取最新的待付款产品信息到redux中*/
            getUnpay();
            this.state.isProcessing = false;
        }
    }

    /*气泡提示*/
    confirm = (productID) => {
        // message.info('该商品已经被移出购物车!');
        this.removeEvent(productID);
    }

    /*结算*/
    paymentManager = async () => {
        let result = await checkLogin();
        //检测用户是否登录
        if (result.code !== 0) {
            this.showLoginConfirm();
            return;
        }
        let checkedItem = [];
        this.props.cartData.unpay.forEach(item => {
            if (item.check) {
                checkedItem.push(item.storeID);
            }
        });
        //检测有没有商品被选中
        if (checkedItem.length === 0) {
            this.noCheckedItemMessage();
            return;
        }
        checkedItem = checkedItem.map(storeID => {
            return queryPayment(storeID);
        });


        Promise.all(checkedItem).then(() => {
            this.props.getUnpay();
            this.props.getPaid();
        })
    }

    /*没有选中商品提示*/
    noCheckedItemMessage() {
        const modal = Modal.error({
            title: '没有需要结算的商品',
            content: '请至少选择1件商品进行结算',
        });
        setTimeout(() => modal.destroy(), 1100);
    }

    /*确认是否需要登录提示*/
    showLoginConfirm() {
        let historyObj = this.props.history;
        confirm({
            title: '您目前尚未登录',
            content: '是否现在登录以进行结算?',
            onOk() {
                historyObj.push('/account/login')
            },
            onCancel() {
                return;
            },
        });
    }
}

export default connect(state => ({...state.cart}), action.cart)(Unpay);