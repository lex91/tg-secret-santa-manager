const store = require('../store');

module.exports = (ctx) => ctx.reply('На данный момент зарегистрированы:\n' + store.users.toString());
