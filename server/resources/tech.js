module.exports = (entity) => {
    const tech = entity.table;

    return {
        index: async function (ctx, next) {
            await next();
            let result = await tech.getAll();
            ctx.body = result;
        },
        show: async function (ctx, next) {
            await next();
            let result = await tech.get(ctx.params.tech);
            if (!result) {
                ctx.status = 404;
                ctx.body = "Not Found";
            } else {
                ctx.body = result;
            }
        },
        create: async function (ctx, next) {
            await next();
            if (!ctx.request.body || !ctx.request.body.name)
                ctx.throw(400, ".name required");
            let techObj = (({ name, count }) => ({
                name,
                count,
            }))(ctx.request.body);
            const result = await tech.create(techObj);
            ctx.status = 201;
            ctx.body = result;
        },

        destroy: async function (ctx, next) {
            await next();
            await tech.delete(ctx.params.tech);
            ctx.status = 204;
            ctx.body = ""; //no body for no content response
        },

        update: async function (ctx, next) {
            console.log(ctx.params.tech);
            await next();
            let techObj = (({ name, count }) => ({
                name,
                count,
            }))(ctx.request.body);
            const result = await tech.update(ctx.params.tech, techObj);
            ctx.status = 200;
            ctx.body = result;
        },
    };
};

module.exports.permissions = {
    default: [], //open permissions
};
