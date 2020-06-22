const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, (input) => resolve(input));
  });
}

const inputCommand = () => {
  return new Promise((resolve, reject) =>
    rl.question(`-> `, (command) => {
      resolve(command);
    })
  );
};

const inputDecision = (command) => {
  return new Promise((resolve, reject) =>
    rl.question(`Did you mean ${command}? [Y/N] `, (response) => {
      rl.close();
      resolve(response);
    })
  );
};

module.exports = { inputCommand, inputDecision };
