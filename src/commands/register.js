const store = require('../store');
const selectUser = require('../utils/selectUser');
const userToString = require('../utils/userToString');
const botService = require('../botService');

module.exports = (ctx) => {
  const user = selectUser(ctx);
  if (!user) {
    return ctx
      .reply('Прости, не понимаю кто ты.')
      .then(() => Promise.reject(null))
  }

  if (store.users.has(user)) {
    return ctx.reply('Я тебя уже добавлял');
  } else {
    store.users.add(user);
    botService.sendMessageToChat(`Новый участник: ${userToString(user)}!`);

    return ctx.reply('Добавил тебя в список!');
  }
};
