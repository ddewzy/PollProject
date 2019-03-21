const koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const Resource = require('koa-resource-router');
const path = require('path');
const body = require('koa-bodyparser');
const wrapper = require('koa-middleware-wrapper')
const decode = require('koa-decode-params')

const bodyMiddleware = wrapper(body()); //need to wrap because koa-resource-router expects a generator pattern
                                        //middleware, whereas koa-bodyparser provides an async pattern
const decodeMiddleware = wrapper(decode());
const cats = new Resource('cats', bodyMiddleware, decodeMiddleware, require('./resources/cats'));
const koaApi = new koa();
koaApi.use(cats.middleware());

const koaApp = new koa();
koaApp.use(mount('/api', koaApi));

koaApp.use(serve(path.resolve(__dirname, "../client")));

koaApp.listen(3000);
