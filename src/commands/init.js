const helpCommand = require('./help');
const store = require('../store');

module.exports = (ctx) => {
  const params = (
    ctx.message
    && ctx.message.text
    && ctx.message.text.split(' ').slice(1)
  ) || [];

  if (!ctx.chat || !params.length) {
    return ctx.reply(`Не могу инициализировать игру :(`);
  }

  store.init({ chat: ctx.chat, password: params[0] });

  return helpCommand(ctx);
};
