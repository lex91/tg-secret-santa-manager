const Telegraf = require('telegraf');

const Users = require('./Users');
const { forOwnerOnly, noop, selectUser, userToString } = require('./utils');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
  console.log("Server has initialized bot nickname. Nick: " + botInfo.username);

  bot.start((ctx) => {
    const user = selectUser(ctx);
    if (!user) {
      return ctx.replyWithMarkdown(`
Не удалось определить пользователя.
Для того, чтобы использовать меня - запустите команду /start еще раз
      `);
    }

    const users = new Users();
    users.add(user);
    initActions({ owner: user, users });

    ctx.reply(`
Привет! Я здесь, чтобы разыграть тайного санту!
Я буду выполнять команды \@${user.username}. Все, кто хочет добавиться в список для жеребьевки - напишите в чат любое сообщение, упомянув меня (\@${bot.options.username})
Да пребудет с вами Новый Год, йохохо!

P.S. Прошу, НЕ используйте команду \`\/start\` снова (если конечно не хотите сбросить все данные текущего розыгрыша и начать заново) 
    `);
  });

  bot.hears(RegExp(bot.options.username), (ctx) => actions.registerUser(ctx));
  bot.command('list', (ctx) => actions.getList(ctx));
  bot.command('run', (ctx) => actions.doDraft(ctx));

  bot.startPolling();
});


const actions = {
  registerUser: noop,
  getList: noop,
  doDraft: noop,
};

const initActions = ({ owner, users }) => {
  actions.registerUser = (ctx) => {
    const user = selectUser(ctx);
    if (!user) {
      return;
    }

    users.add(
      user,
      () => ctx.reply(`${userToString(user)}, я добавил тебя в список! 🐷`),
      () => ctx.reply(`${userToString(user)}, ты уже в списке, не беспокойся 👍`)
    );
  };

  actions.getList = forOwnerOnly((ctx) => {
    ctx.reply(users.toString());
  }, owner);

  actions.doDraft = forOwnerOnly((ctx) => {
    users.calculateMap().forEach((target, user) => {
      bot.telegram.sendMessage(user.id, `
Привет! Ты участвовал(а) в жеребьёвке тайного санты и тебе выпадает:
${userToString(target)}

Начинай выбирать подарок! :)
      `);
    });

    ctx.reply(`Каждый из участников должен получить личное сообщение с именем. Устройте друг другу веселый праздник, йохохо!`);
  }, owner);
};
