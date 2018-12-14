const Telegraf = require('telegraf');

const notConfiguredReject = () => Promise.reject('Not configured');

class BotService {
  constructor() {
    this.isConfigured = false;
  }

  configure({ store, configureBot }) {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.bot.telegram.getMe().then((botInfo) => {
      this.bot.options.username = botInfo.username;
      console.log(`Server has initialized bot nickname. Nick: ${botInfo.username}`);
    });
    configureBot({ bot: this.bot, store });

    this.store = store;

    this.isConfigured = true;
  }

  sendMessage(id, message) {
    return this.isConfigured ? this.bot.telegram.sendMessage(id, message) : notConfiguredReject();
  }

  sendMessageToChat(message) {
    return this.isConfigured
      ? this.store.chat
        ? this.bot.telegram.sendMessage(this.store.chat.id, message)
        : Promise.reject('Chat is not set')
      : notConfiguredReject();
  }
}


module.exports = new BotService();
