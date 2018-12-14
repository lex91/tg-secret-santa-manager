const store = require('../store');
const registerCommand = require('./register');

module.exports = (ctx) => {
  if (ctx.message && ctx.message.text && store.checkPassword(ctx.message.text)) {
    return ctx.reply(`Пароль принят! Сейчас, одну секунду...`)
      .then(() => registerCommand(ctx))
      .then(
        () => ctx.reply(`Я проведу жеребьёвку и дам тебе знать о результате`),
        () => ctx.reply(`Что-то не вышло, попробуй заново`),
      );
  }

  return ctx.reply(`Прости, неверный пароль. Я тебя не знаю.`)
};