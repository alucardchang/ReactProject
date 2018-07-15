import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, Switch, Link} from 'react-router-dom';


/*ANTD Component*/
import {Divider, Button, Icon,Alert} from 'antd';

/*Dispatch Action Creater*/
import action from '../../store/action/index'


class ProductList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false
        }

    }

    async componentDidMount() {
        let {productListData, getProductList} = this.props;
        if (productListData.data.length === 0) {
            await getProductList();
        }
    }

    componentWillReceiveProps() {
        this.setState({
            isLoading: false
        })
    }


    render() {
        // this.state.isLoading = false;
        let {productListData} = this.props;
        // console.log(productListData.data);
        return <div className='productListBox'>
            <Divider orientation="left">{this.getListTitle()}</Divider>
            {productListData.data.length !== 0 ? (<div className='showContainer'>
                <ul className='showList'>
                    {productListData.data.map((item, index) => {
                        let {id, name, pic, dec, price} = item;
                        return <li key={index}>
                            <Link className='itemContainer' to={`/product/info?productID=${id}`}>
                                <div className="pic">
                                    <img src={pic} alt={name}/>
                                </div>
                                <div className='desc'>
                                    <p>{name}</p>
                                    <p>{dec}</p>
                                </div>
                                <span className='price'>￥{price}</span>
                            </Link>
                        </li>
                    })}
                </ul>
                {productListData.total <= productListData.page ? '' :
                    <Button type="primary" shape="circle" icon="ellipsis" loading={this.state.isLoading}
                            onClick={this.moreProduct}/>}

            </div>) :<Alert className='emptyDataInfo' message="暂无数据" type="info" showIcon />}
        </div>
    }

    /*Display list title based on product type*/
    getListTitle() {
        let {productType} = this.props.productListData,
            text = '全部商品';
        switch (productType) {
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

    /*Get more product data*/
    moreProduct = () => {
        let {page, flag, productType} = this.props.productListData,
            {getProductList} = this.props;
        if (this.state.isLoading) return;
        this.setState({isLoading: true});
        getProductList({
            page: page + 1,
            flag: flag,
            type: productType
        })
    }


}

export default connect(state => ({...state.product}), action.product)(ProductList);