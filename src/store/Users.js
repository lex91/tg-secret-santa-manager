const userToString = require('../utils/userToString');
const calculateShuffledArray = require('../utils/calculateShuffledArray');

module.exports = class {
  constructor() {
    this.data = new Map();
  }

  add(user) {
    this.data.set(user.id, user);
  }

  has(user) {
    return this.data.has(user.id);
  }

  calculateMap() {
    const users = [];
    this.data.forEach(user => {
      users.push(user);
    });

    const targets = calculateShuffledArray(users);

    return users.reduce((result, user, index) => {
      result.set(user, targets[index]);

      return result;
    }, new Map());
  }

  toString() {
    let result = '';
    let index = 1;

    this.data.forEach(user => {
      result += `${index++}. ${userToString(user)}\n`;
    });

    return result;
  }
};
