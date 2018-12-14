const Stage = require('telegraf/stage');

const registration = require('../scenes/registration');

module.exports = Stage.enter(registration.name);
