const CONFIG = require('./config'),
    PERSONAL_PATH = './json/personal.json',
    PRODUCT_PATH = './json/product.json',
    STORE_PATH = './json/store.json',
    BANNER_PATH = './json/banner.json',
    VIDEO_PATH = './json/video.json',
    RECOMMEND_PATH = './json/recommend.json',
    NEWS_PATH = './json/news.json';


/*-CREATE SERVER-*/
const express = require('express'),
    app = express();
app.listen(CONFIG.PORT, () => {
    console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
    const {ALLOW_ORIGIN, CREDENTIALS, HEADERS, ALLOW_METHODS} = CONFIG.CROS;
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Credentials", CREDENTIALS);
    res.header("Access-Control-Allow-Headers", HEADERS);
    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

const session = require('express-session');
app.use(session(CONFIG.session));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const {readFile} = require('./utils/promiseFS');
app.use(async (req, res, next) => {
    req.personalDATA = JSON.parse(await readFile(PERSONAL_PATH));
    req.productDATA = JSON.parse(await readFile(PRODUCT_PATH));
    req.storeDATA = JSON.parse(await readFile(STORE_PATH));
    req.bannerDATA = JSON.parse(await readFile(BANNER_PATH));
    req.videoDATA = JSON.parse(await readFile(VIDEO_PATH));
    req.recommendDATA = JSON.parse(await readFile(RECOMMEND_PATH));
    req.newsDATA = JSON.parse(await readFile(NEWS_PATH));
    next();
});

/*-ROUTE-*/
app.use('/product', require('./routes/product'));
app.use('/personal', require('./routes/personal'));
app.use('/store', require('./routes/store'));
app.use((req, res, next) => {
    res.status(404);
    res.send('NOT FOUND!');
});