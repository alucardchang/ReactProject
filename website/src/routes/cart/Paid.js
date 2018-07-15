import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

/*API*/
import {checkLogin} from '../../api/account';


/*ANTD Component*/
import {Popconfirm, message, Tag, Alert} from 'antd';

class Paid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            /*检测用户是否登陆标识*/
            logined: false
        }
    }

    async componentDidMount() {
        let result = await checkLogin();
        if (result.code === 0) {
            this.setState({
                logined: true
            })
        }

    }

    render() {
        let {paid} = this.props.cartData;
        if (!this.state.logined) {
            return <Link to='/account/login'><Alert className='loginInfo'
                message="未登录"
                description="您目前暂未登录，请点击这里完成登录操作"
                type="warning"
                showIcon
            /></Link>
        }
        if (paid.length === 0) {
            return <Alert className='paidInfo' message="您目前没有购买过任何商品" type="info" showIcon/>
        }
        return <ul className='paidCartList'>
            {paid.map((item, index) => {
                // console.log(item);
                return <li key={index}>
                    <Link className='itemContainer' to={`/product/info?productID=${item.id}`}>
                        <span className="pic">
                            <img src={item.pic} alt={item.name}/>
                        </span>
                        <div className='desc'>
                            <p>{item.name}</p>
                            <p>{item.dec}</p>
                        </div>
                        <div className='priceQuan'>
                            <span>￥{item.price}</span>
                            <span className='quantityBox'>数量<Tag>{item.quantity}</Tag></span>
                        </div>
                    </Link>
                </li>
            })}
        </ul>
    }
}

export default connect(state => ({...state.cart}))(Paid);