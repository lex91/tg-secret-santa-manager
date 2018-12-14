const store = require('../store');
const selectUser = require(`../utils/selectUser`);

module.exports = (ctx) => {
  const owner = selectUser(ctx);
  const canOwnBot = (
    owner
    && ctx.message
    && ctx.message.text
    && RegExp(`password=${process.env.OWNER_PASSWORD}`).test(ctx.message.text)
  );
  if (canOwnBot) {
    store.owner = owner;
    ctx.reply(`Хозяин, инициализация завершена!`);
  }
};
