import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


/*Dispatch*/
import action from '../store/action/index';

/*Redux*/
import store from '../store/index';


/*ANTD Component*/
import {Carousel, Divider, Card, Rate} from 'antd';

/*CSS*/
import '../static/css/home.less';


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    async componentDidMount() {
        console.log(this.props);
        let {getBanner, bannerData, videoData, recommendData, getVideo, getRecommend} = this.props;
        /*当状态容器中bannerData为空是才执行派发任务*/
        if (!bannerData) {
            console.log('send request');
            await getBanner();
            console.log('getbanner');
        }
        if (!videoData) {
            console.log('send request');
            await getVideo();
            console.log('getvideo');
        }
        if (!recommendData) {
            console.log('send request');
            await getRecommend();
            console.log('getrecommend');
        }

    }

    render() {
        let {bannerData, videoData, recommendData} = this.props;
        !bannerData ? bannerData = [] : null;
        !videoData ? videoData = [] : null;
        !recommendData ? recommendData = [] : null;

        return <div className='homeBox'>
            <div className='bannerBox'>
                {bannerData.length !== 0 ? (<Carousel autoplay>{bannerData.map((item, index) => {
                    let {pic, name} = item;
                    return <div key={index}>
                        <div className='titleBar'>{name}</div>
                        <img src={pic} alt={name}/>
                    </div>
                })}</Carousel>) : ''}
            </div>

            {/*专家评测*/}
            <div className='evalBox'>
                <span className='tag'>专家评测</span>
                <span className='picBox picA'></span>
                <span className='picBox picB'></span>
                <span className='picBox picSub picC'></span>
                <span className='picBox picSub picD'></span>
                <span className='picBox picSub picE'></span>

            </div>

            {/*科技视屏*/}
            <div className='videoBox'>
                <span className='tag'>科技视频</span>
                <div className='container'>
                    {videoData.length !== 0 ? (videoData.map((item, index) => {
                        let {title, poster, vid, date} = item;
                        return <div key={index} className='vidCard'>
                            <video src={vid} controls="controls" preload='none' poster={poster}/>
                            <p className='videoTitle'>{title}</p>
                            <span className='date'>{date}</span>
                        </div>

                    })) : ''}
                </div>
            </div>

            {/*分割线*/}
            <Divider>推荐产品</Divider>
            {/*推荐产品*/}
            <div className='recomProdBox'>

                {recommendData.length !== 0 ? (recommendData.map((item,index)=>{
                    let {id,title,pic,dec,price,rate}=item;
                    return <Card key={index} title={title} extra={<Link to={`/product/Info?productID=${id}`}>More</Link>}>
                        <div className='prodImg'>
                            <img src={pic} alt={title}/>
                        </div>
                        <div className='prodInfo'>
                            <p>{dec}</p>
                            <Rate disabled defaultValue={rate} />
                            <span>￥{price}</span>
                        </div>
                    </Card>

                })): ''}


            </div>

        </div>
    }
}

export default connect(state => ({...state.home}), action.home)(Home);