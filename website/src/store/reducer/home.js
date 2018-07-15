import * as TYPES from '../action-types';

let INIT_STATE = {
    bannerData: null,
    videoData: null,
    recommendData: null,
};
export default function home(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    let payload = {};
    switch (action.type) {
        case TYPES.GET_BANNER_DATA:
            payload = action.bannerData;
            let {code, data} = payload;
            parseFloat(code) === 0 ? state.bannerData = data : null;
            break;
        case TYPES.GET_VIDEO_DATA:
            payload = action.videoData;
            let {code: vidCode, data: vidData} = payload;
            parseFloat(vidCode) === 0 ? state.videoData = vidData : null;
            break;
        case TYPES.GET_RECOMMEND_DATA:
            payload = action.recommendData;
            console.log(payload);
            let {code: recommCode, data: recommData} = payload;
            parseFloat(recommCode) === 0 ? state.recommendData = recommData : null;
            break;
    }
    return state;
};

