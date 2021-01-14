const Kahoot = require('kahoot.js-updated');
const client = new Kahoot();
console.log('Joining kahoot...');
client.join(221648, 'bot' + Math.round(Math.random() * 1000));
client.on('Joined', () => {
  console.log('I joined the Kahoot!');
});
client.on('QuizStart', () => {
  console.log('The quiz has started!');
});
client.on('QuestionStart', (question) => {
  console.log('A new question has started, answering the first answer.');
  question.answer(0);
});
client.on('QuizEnd', () => {
  console.log('The quiz has ended.');
});
