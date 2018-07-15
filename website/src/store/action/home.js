import * as TYPES from '../action-types';
import {queryBanner, queryVideo, queryRecommend} from '../../api/home'

let home = {
    getBanner() {
        return async dispatch => {
            let bannerData = await queryBanner();
            dispatch({
                type: TYPES.GET_BANNER_DATA,
                bannerData
            })
        }
    },
    getVideo() {
        return async dispatch => {
            let videoData = await queryVideo();
            dispatch({
                type: TYPES.GET_VIDEO_DATA,
                videoData
            })
        }
    },
    getRecommend() {
        return async dispatch => {
            let recommendData = await queryRecommend();
            dispatch({
                type: TYPES.GET_RECOMMEND_DATA,
                recommendData
            })
        }
    }
}
export default home;