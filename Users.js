const { calculateShuffledArray, userToString } = require('./utils');

class Users {
  constructor() {
    this.data = new Map();
  }

  add(user, onSuccess, onDuplicate) {
    if (!this.data.has(user.id)) {
      this.data.set(user.id, user);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      if (onDuplicate) {
        onDuplicate();
      }
    }
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
}

module.exports = Users;
