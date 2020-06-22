const jsonUtils = require("./jsonUtils");
const utils = require("./utils");
const { execCommand } = require("./commandHandler");
const { inputCommand, inputDecision } = require("./inputUtils");
const { candidates } = require("./suggest");

const { dictionary } = jsonUtils.loadDictionary();

const exec = async () => {
  const commandAndArguments = await inputCommand().then((command) =>
    utils.tokenizeCommand(command)
  );
  const command = commandAndArguments[0];
  const arguments = commandAndArguments.slice(1, commandAndArguments.length);

  if (dictionary.includes(command)) {
    execCommand(command, arguments);
  } else {
    const suggestedCommands = candidates(command);
    if (Array.isArray(suggestedCommands)) {
      if (suggestedCommands.length === 1) {
        const response = await inputDecision(suggestedCommands[0]).then(
          (res) => {
            return res;
          }
        );
        if (response === "y") {
          jsonUtils.saveNewSuggestedCommand(command, suggestedCommands[0]);
          execCommand(suggestedCommands[0], arguments);
        }
      }
    } else {
      console.log(suggestedCommands.message);
    }
  }
};

exec();
