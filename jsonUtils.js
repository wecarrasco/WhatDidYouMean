let fs = require("fs");

const FILE = "dictionary.json";

const loadDictionary = () => {
  const file_content = fs.readFileSync(FILE);
  const json = JSON.parse(file_content);
  return json;
};

const savedCommands = () => {
  const file_content = fs.readFileSync(FILE);
  const json = JSON.parse(file_content);
  return json.saved;
};

const commandsRegex = () => {
  const file_content = fs.readFileSync(FILE);
  const json = JSON.parse(file_content);
  return json.regex;
};

const saveNewSuggestedCommand = (suggested, realCommand) => {
  const file_content = fs.readFileSync(FILE);
  const json = JSON.parse(file_content);
  json.saved[suggested] = realCommand;
  const newDictionary = JSON.stringify(json, null, 2);

  fs.writeFile(FILE, newDictionary, (err) => {
    if (err) throw err;
  });
};

module.exports = {
  loadDictionary,
  savedCommands,
  commandsRegex,
  saveNewSuggestedCommand,
};
