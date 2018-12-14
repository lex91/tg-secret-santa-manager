const Telegraf = require('telegraf');

const ownCommand = require('./commands/own');
const initCommand = require('./commands/init');
const startCommand = require('./commands/start');
const gameNotStartedStubCommand = require('./commands/gameNotStartedStub');
const helpCommand = require('./commands/help');
const drawUsersCommand = require('./commands/drawUsers');
const listCommand = require('./commands/list');
const processPasswordCommand = require('./commands/processPassword');

const selectUser = require('./utils/selectUser');

module.exports = ({ bot, store }) => {
  const isOwnerMessage = (ctx) => store.isOwner(selectUser(ctx));
  const isGameStarted = (_ctx) => store.isGameStarted();
  const isPrivateChat = (ctx) => ctx.chat && ctx.chat.type === 'private';

  bot.start(
    Telegraf.branch(
      isPrivateChat,
      startCommand,
      (ctx) => ctx.reply('OK')
    )
  );

  bot.help(
    Telegraf.branch(
      isGameStarted,
      helpCommand,
      gameNotStartedStubCommand
    )
  );

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

  bot.on(
    'message',
    Telegraf.optional(
      isPrivateChat,
      Telegraf.branch(
        isGameStarted,
        processPasswordCommand,
        gameNotStartedStubCommand,
      )
    )
  );
};
