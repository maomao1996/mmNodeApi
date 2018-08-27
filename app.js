const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');
const config = require('./config/index.js');
const router = require('./routes/index.js');

const app = new Koa();

// 跨域配置
app.use(cors({ origin: '*' }));

// 托管静态文件
app.use(koaStatic(path.resolve(__dirname, 'static')));

// 调用路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 端口
const PORT = config.PORT;

// 启动服务
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
