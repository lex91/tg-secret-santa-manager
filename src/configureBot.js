const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const ownCommand = require('./commands/own');
const initCommand = require('./commands/init');
const startCommand = require('./commands/start');
const gameNotStartedStubCommand = require('./commands/gameNotStartedStub');
const helpCommand = require('./commands/help');
const drawUsersCommand = require('./commands/drawUsers');
const listCommand = require('./commands/list');
const registration = require('./scenes/registration');
const selectUser = require('./utils/selectUser');

module.exports = ({ bot, store }) => {
  const isOwnerMessage = (ctx) => store.isOwner(selectUser(ctx));
  const isGameStarted = (_ctx) => store.isGameStarted();

  bot.use(session());

  const stage = new Stage([registration.scene]);
  bot.use(stage.middleware());

  bot.start(
    Telegraf.branch(
      isGameStarted,
      startCommand,
      gameNotStartedStubCommand
    )
  );

  bot.help(helpCommand);

  bot.command(
    'own',
    ownCommand
  );

  bot.command(
    'init',
    Telegraf.optional(
      isOwnerMessage,
      initCommand,
    ),
  );

  bot.command(
    'run',
    Telegraf.optional(
      (ctx) => isOwnerMessage(ctx) && isGameStarted(ctx),
      drawUsersCommand,
    ),
  );

  bot.command(
    'list',
    Telegraf.branch(
      isGameStarted,
      listCommand,
      gameNotStartedStubCommand
    ),
  );

  const { BOT_TOKEN, URL, PORT, NODE_ENV } = process.env;
  if (NODE_ENV === 'production') {

    console.warn(`starting in PROD: `, BOT_TOKEN, URL, PORT);

    bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
    bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
  } else {
    console.warn(`starting in DEV mode`, BOT_TOKEN, URL, PORT);
    bot.startPolling();
  }
};
