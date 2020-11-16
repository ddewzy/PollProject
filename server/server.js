const koa = require("koa");
const mount = require("koa-mount");
const path = require("path");
const body = require("koa-bodyparser");
const decode = require("koa-decode-params");
const resourceBuilder = require("unloop-resource-builder")(__dirname);
const staticRouter = require("unloop-static-router")(
    path.resolve(__dirname, "../client"),
    [
        {
            route: "/",
            permissions: [],
        },
    ]
);

const builderWithMiddleware = resourceBuilder(decode());
const tech = builderWithMiddleware("tech"); //has to match exactly to filename string

const koaApi = new koa();

const koaApp = new koa();
koaApp.use(body());

koaApi.use(tech.middleware());
koaApp.use(mount("/api", koaApi));

koaApp.use(staticRouter(koaApp));
koaApp.listen(3000);
