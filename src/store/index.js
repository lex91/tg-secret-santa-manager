const Users = require('./Users');

class Store {
  constructor() {
    this.init({ chat: null, password: null });
    this.owner = null;
  }

  init({ chat, password }) {
    this.chat = chat;
    this.password = password;
    this.users = new Users();
  }

  isGameStarted() {
    return this.owner && this.chat;
  }

  isOwner(user) {
    return user && this.owner && user.id === this.owner.id;
  }

  checkPassword(password) {
    return password === this.password;
  }
}

module.exports = new Store();
