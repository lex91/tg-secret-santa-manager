module.exports = (ctx) => ctx.from && !ctx.from.is_bot ? ctx.from : null;
