import React from 'react';
import {connect} from 'react-redux';

/*Dispatch*/
import action from '../store/action/index';

/*ANTD Component*/
import {Divider, Alert} from 'antd';

/*Import CSS*/
import '../static/css/news.less'

class News extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    async componentDidMount() {
        let {getProductNews, newsData} = this.props;
        if (!newsData) {
            getProductNews();
        }
    }


    render() {
        let {newsData} = this.props;
        if (!newsData) {
            return <div className='infoBox'>
            <Alert className='noNewsDataInfo' message="暂无新品资讯" type="info" showIcon/>
            </div>
        }
        return <section>
            <Divider>新品资讯</Divider>
            <ul className='newsList'>
                {newsData.map((item, index) => {
                    let {pic, title, date} = item;
                    return <li key={index}>
                        <div className="pic">
                            <img
                                src={pic}
                                alt={title}/>
                        </div>
                        <div className='desc'>
                            <p>{title}</p>
                            <p>{date}</p>
                        </div>
                    </li>

                })}
            </ul>
        </section>
    }
}

export default connect(state => ({...state.product}), action.product)(News);