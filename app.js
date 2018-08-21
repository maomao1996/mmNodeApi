const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');

const app = new Koa();
const config = require('./config/index.js');

// 托管静态文件
app.use(koaStatic(path.resolve(__dirname, 'static')));

// 跨域配置
app.use(cors());

// 端口
const PORT = config.PORT;

// 启动服务
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
