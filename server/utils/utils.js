const {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json';

function ADD_STORE(req, res, productID, quantity) {
    // console.log(req.storeDATA);
    let personID = req.session.personID,
        storeInfo = {
            id: req.storeDATA.length === 0 ? 1 : (parseFloat(req.storeDATA[req.storeDATA.length - 1].id) + 1),
            productID,
            personID,
            quantity,
            state: 0
        };

    /*商品重复性检测*/
    //当session中的未支付商品和json文件中未支付商品重复时，累加数量
    let itemObj = {productID, quantity,personID},
        dupMark = false;
    if (req.storeDATA.length > 0) {
        let arrItem = null;
        for (let i = 0; i < req.storeDATA.length; i++) {
            arrItem = req.storeDATA[i];
            console.log(itemObj);
            if (itemObj.productID == arrItem.productID && (arrItem && arrItem.state == 0)&&itemObj.personID == arrItem.personID) {
                dupMark = true;
                break;
            }
        }
        // 如果store.json中没有该商品，则往store.json中添加该商品。否则将对应商品数量进行累加
        dupMark ? (arrItem.quantity = parseFloat(arrItem.quantity) + parseFloat(itemObj.quantity)) : req.storeDATA.push(storeInfo);
    } else {
        //第一次空数组时直接将商品加入store.json
        req.storeDATA.push(storeInfo);
    }
    return writeFile(STORE_PATH, req.storeDATA);
}

module.exports = {
    ADD_STORE
};