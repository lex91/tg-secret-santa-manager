const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const registerCommand = require('../commands/register');

const name = 'registration';
const scene = new Scene(name);

scene.enter((ctx) => ctx.reply(`Привет! Если хочешь участвовать в жеребьёвке - напиши \`хочу\``));

scene.hears(
  /^хочу$/gi,
  (ctx) => registerCommand(ctx)
    .then(
      () => ctx.reply(`Я проведу жеребьёвку и дам тебе знать о результате`),
      () => ctx.reply(`Что-то не вышло, попробуй заново`),
    )
    .then(() => Stage.leave()(ctx))
);

scene.on('message', (ctx) => ctx.reply('Моя твоя не понимать'));

module.exports = {
  scene,
  name,
};