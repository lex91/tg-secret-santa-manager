const store = require('../store');
const userToString = require('../utils/userToString');

module.exports = (ctx) => ctx.reply(`
Привет! Я здесь, чтобы разыграть тайного санту! Мой хозяин ${userToString(store.owner)}, все вопросы задавайте ему.
Чтобы добавиться в список для жеребьевки - напишите мне в приват \`/start\` и мы договоримся 🤝
Как только произойдет что-то интересное - я напишу сюда.
Да пребудет с вами Новый Год, йохохо!
`);
