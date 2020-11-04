module.exports = (entity) => {
    const tech = entity.table;

    return {
        index: async function (ctx, next) {
            await next;
            let result = await tech.getAll();
            ctx.body = result;
        },
        show: async function (ctx, next) {
            await next;
            let result = await tech.get(ctx.params.tech);

            if (!result) {
                ctx.status = 404;
                ctx.body = "Not Found";
            } else {
                ctx.body = result;
            }
        },
        create: async function (ctx, next) {
            await next;
            if (!ctx.request.body || !ctx.request.body.name)
                ctx.throw(400, ".name required");
            let tech = (({ name, count }) => ({
                name,
                count,
            }))(ctx.request.body);
            await tech.create(tech);
            ctx.status = 201;
            ctx.body = "added!";
        },
        //implament an update
        /**
         *
         * DELETE a cat
         *
         * destroy: async function(next) {
         *   //implement me!
         * }
         */

        /**
         *
         * UPDATE a cat
         *
         * update = async function(next) {
         *   //implement me!
         * }
         */
    };
};

module.exports.permissions = {
    default: [], //open permissions
};
