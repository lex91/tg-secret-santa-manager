const botService = require('./botService');
const configureBot = require('./configureBot');
const store = require('./store');

botService.configure({ store, configureBot });