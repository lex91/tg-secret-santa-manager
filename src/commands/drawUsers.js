const store = require('../store');
const userToString = require('../utils/userToString');
const botService = require('../botService');

const createMessage = (target) => `
Привет! Ты участвовал(а) в жеребьёвке тайного санты и тебе выпадает:
${userToString(target)}

Начинай выбирать подарок! :)
`;

module.exports = (_ctx) => {
  store.users
    .calculateMap()
    .forEach((target, user) => {
      botService.sendMessage(user.id, createMessage(target));
    });

  botService.sendMessageToChat(
    `Каждый из участников должен получить личное сообщение с именем. Устройте друг другу веселый праздник, йохохо!`
  );
};