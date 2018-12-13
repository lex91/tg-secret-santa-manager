const selectUser = (ctx) => ctx.from && !ctx.from.is_bot ? ctx.from : null;
const forOwnerOnly = (f, owner) => (ctx) => {
  const user = selectUser(ctx);
  if (user && user.id === owner.id) {
    return f(ctx);
  }

  ctx.reply(`Вам не позволено использовать эту команду!`);
};

const noop = () => {};

const calculateShuffledArray = (array) => {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [result[i], result[j]] = [result[j], result[i]];
  }

  if (array.length <= 1 || result[0] !== array[0]) {
    return result;
  }

  return calculateShuffledArray(array);
};

const userToString = (user) => `\@${user.username} (${user.first_name}${user.last_name ? ' ' + user.last_name : ''})`;

module.exports = {
  noop,
  selectUser,
  forOwnerOnly,
  calculateShuffledArray,
  userToString,
};
