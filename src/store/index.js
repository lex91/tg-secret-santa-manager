const Users = require('./Users');

class Store {
  constructor() {
    this.reset();
  }

  reset() {
    this.owner = null;
    this.chat = null;
    this.users = new Users();
  }

  isGameStarted() {
    return this.owner && this.chat;
  }

  isOwner(user) {
    return user && this.owner && user.id === this.owner.id;
  }
}

module.exports = new Store();
