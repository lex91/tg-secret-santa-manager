const store = require('../store');
const botService = require('../botService');
const userToString = require('../utils/userToString');

module.exports = (ctx) => ctx.reply(`
Привет! Меня зовут ${botService.getMyName()} и я здесь, чтобы разыграть тайного санту!

Чтобы добавиться в список для жеребьевки - напишите мне в приват \`/start\` и следуйте инструкциям.
Я опасаюсь незнакомцев, поэтому при встрече попрошу вас назвать пароль, запомните его:

\`${store.password}\`

Как только произойдет что-то интересное - я напишу. По всем вопросам обращайтесь к моему хозяину: ${userToString(store.owner)}.
Да пребудет с вами Новый Год, йохохо!
`);
