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

  getMyName() {
    return this.isConfigured && ('@' + this.bot.options.username) || `\<я поломался и забыл кто я\>`;
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

  start() {
    if (!this.isConfigured) {
      return;
    }

    const { BOT_TOKEN, URL, PORT, TRANSPORT_MODE } = process.env;

    this.bot.telegram.deleteWebhook();
    console.log(`Starting in mode: ${TRANSPORT_MODE}; URL: ${URL}:${PORT}`);

    if (TRANSPORT_MODE === 'webhook') {
      this.bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
      this.bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
    } else {
      this.bot.startPolling();
    }
  }
}

module.exports = new BotService();
