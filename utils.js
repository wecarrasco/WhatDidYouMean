const alphabetRegex = require("./alphabetRegex");

module.exports.flatten = (ary) => Array.prototype.concat(...ary);

module.exports.tokenizeCommand = (text) => text.split(" ");

module.exports.regexBuilder = (command) => {
  const letters = command.split("");
  let regex = "^";
  letters.forEach((letter) => {
    const letterRegex = `[${alphabetRegex[letter]}]`;
    regex = regex.concat(letterRegex);
  });
  regex = regex.concat("$");
  return regex;
};
