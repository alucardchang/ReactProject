const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json',
    utils = require('../utils/utils');

/*全局quantity*/
let itemQuantity = null;

route.post('/add', (req, res) => {
    let personID = req.session.personID,
        {productID, quantity} = req.body;
    productID = parseFloat(productID);
    itemQuantity = quantity = parseFloat(quantity);
    //=>已经登录状态下，把信息直接存储到JSON中即可
    if (personID) {
        utils.ADD_STORE(req, res, productID, itemQuantity).then(() => {
            res.send({code: 0, msg: 'OK!'});
        }).catch(() => {
            res.send({code: 1, msg: 'NO!'});
        });
        return;
    }

    //=>未登录状态下，临时存储到SESSION中，等到下一次登录成功，直接把信息存储到文件中（并且清空SESSION中的信息）
    !req.session.storeList ? req.session.storeList = [] : null;
    //商品重复性检测，如果添加的商品和storeList中重复了，则直接累加数量，否则直接添加进storeList
    let itemObj = {productID, quantity},
        dupMark = false;
    if (req.session.storeList.length > 0) {
        let arrItem=null;
        for (let i = 0; i < req.session.storeList.length; i++) {
            arrItem = req.session.storeList[i];
            if (itemObj.productID == arrItem.productID) {
                dupMark = true;
                break;
            }
        }
        //如果storeList中没有该商品，则往storeList中添加该商品
        dupMark ? (arrItem.quantity = parseFloat(arrItem.quantity) + parseFloat(itemObj.quantity)) : req.session.storeList.push(itemObj);
    } else {
        //第一次空数组时直接将商品加入
        req.session.storeList.push(itemObj);
    }
    res.send({code: 0, msg: 'OK!'});
});


route.post('/remove', (req, res) => {
    let personID = req.session.personID,
        {productID = 0} = req.body;
    productID = parseFloat(productID);

    if (personID) {
        req.storeDATA = req.storeDATA.filter(item => {
            return !(parseFloat(item.productID) === productID && parseFloat(item.personID) === personID);
        });
        writeFile(STORE_PATH, req.storeDATA).then(() => {
            res.send({code: 0, msg: 'OK!'});
        }).catch(() => {
            res.send({code: 1, msg: 'NO!'});
        });
        return;
    }

    !req.session.storeList ? req.session.storeList = [] : null;
    req.session.storeList = req.session.storeList.filter(item => {
        return parseFloat(item.productID) !== productID;
    });
    res.send({code: 0, msg: 'OK!'});
});

route.get('/info', (req, res) => {
    let state = parseFloat(req.query.state) || 0,
        personID = req.session.personID,
        storeList = [];
    if (personID) {
        req.storeDATA.forEach(item => {
            if (parseFloat(item.personID) === personID && parseFloat(item.state) === state) {
                storeList.push({
                    productID: parseFloat(item.productID),
                    storeID: parseFloat(item.id),
                    quantity: parseFloat(item.quantity)
                });
            }
        });
    } else {
        //用户没有登陆且未付款的项目
        if (state === 0) {
            storeList = req.session.storeList || [];
            storeList = storeList.map(item => {
                return {productID: item.productID, quantity: item.quantity, storeID: 0};
            });
        }
    }

    let data = [];
    storeList.forEach((storeItem = {}) => {
        let item = req.productDATA.find(item => parseFloat(item.id) === storeItem.productID);
        item.storeID = storeItem.storeID;
        item.quantity = storeItem.quantity;
        data.push(item);
    });
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.post('/pay', (req, res) => {
    let {storeID} = req.body,
        personID = req.session.personID,
        isUpdate = false;
    if (personID) {
        req.storeDATA = req.storeDATA.map(item => {
            if (parseFloat(item.id) === parseFloat(storeID) && parseFloat(item.personID) === parseFloat(personID)) {
                isUpdate = true;
                return {...item, state: 1};
            }
            return item;
        });
        if (isUpdate) {
            console.log('update');
            writeFile(STORE_PATH, req.storeDATA).then(() => {
                res.send({code: 0, msg: 'OK!'});
            }).catch(() => {
                res.send({code: 1, msg: 'NO!'});
            });
        } else {
            res.send({code: 1, msg: 'NO!'});
        }
        return;
    }
    res.send({code: 1, msg: 'NO LOGIN!'});
});

module.exports = route;