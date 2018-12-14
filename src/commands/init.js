const helpCommand = require('./help');
const store = require('../store');

module.exports = (ctx) => {
  if (!ctx.chat) {
    return ctx.reply(`Не понимаю где я :(`);
  }

  store.chat = ctx.chat;

  return helpCommand(ctx);
};
