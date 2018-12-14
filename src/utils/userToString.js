module.exports = ({ username, first_name, last_name }) => (
  (username ? `\@${username} ` : '\<username не задан\> ')
  + '('
  + first_name
  + (last_name ? ' ' + last_name : '')
  + ')'
);
