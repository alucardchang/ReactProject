const express = require('express'),
    route = express.Router();

route.get('/banner', (req, res) => {
    let data = req.bannerDATA.slice(0);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.get('/video', (req, res) => {
    let data = req.videoDATA.slice(0);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.get('/recommend', (req, res) => {
    let data = req.recommendDATA.slice(0);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.get('/info', (req, res) => {
    let {productID} = req.query;
    productID = parseFloat(productID);
    let item = req.productDATA.find(item => {
        return parseFloat(item.id) === productID;
    });
    if (item) {
        res.send({
            code: 0,
            msg: 'OK!',
            data: item
        });
        return;
    }
    res.send({
        code: 1,
        msg: 'NO!',
        data: null
    });
});

route.get('/list', (req, res) => {
    let {limit = 10, page = 1, type = 'all'} = req.query;
    limit = parseFloat(limit);
    page = parseFloat(page);

    //=>筛选
    if (type !== 'all') {
        req.productDATA = req.productDATA.filter(item => {
            return item.type === type;
        });
    }

    //=>分页
    let total = Math.ceil(req.productDATA.length / limit),
        result = [];
    if (page <= total) {
        for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
            let item = req.productDATA[i];
            if (!item) break;
            result.push(item);
        }
    }
    res.send({
        code: 0,
        msg: 'OK!',
        total,
        limit,
        page,
        data: result
    });
});

module.exports = route;