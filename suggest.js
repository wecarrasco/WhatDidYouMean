const utils = require("./utils");
const { savedCommands, loadDictionary, commandsRegex } = require("./jsonUtils");

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const { dictionary } = loadDictionary();

let commands = dictionary.reduce(
  (command, item) => ((command[item] = 1), command),
  {}
);

const commandSplitter = (command) =>
  Array(command.length + 1)
    .fill(command)
    .map((command, index) => {
      const first = command.slice(0, index);
      const last = command.slice(index);
      return [first, last];
    });

const commandCombinations = (command) => {
  const pairs = commandSplitter(command);

  let deleteLetter = pairs
    .filter((pair) => {
      return pair[1].length > 0;
    })
    .map((pair) => {
      return pair[0] + pair[1].slice(1);
    });

  let transposes = pairs
    .filter((pair) => {
      return pair[1].length > 1;
    })
    .map((pair) => {
      return pair[0] + pair[1][1] + pair[1][0] + pair[1].slice(2);
    });

  let replaces = utils.flatten(
    pairs.map(([a, b]) => alphabet.map((c) => a + c + b.slice(1)))
  );

  let inserts = utils.flatten(
    pairs.map(([a, b]) => alphabet.map((c) => a + c + b))
  );

  return [...deleteLetter, ...transposes, ...replaces, ...inserts];
};

const combinationsOfCombinations = (command) =>
  Array.from(
    new Set(
      utils.flatten(
        commandCombinations(command).map((e1) =>
          commandCombinations(e1).map((e2) => e2)
        )
      )
    )
  );

checkIfSaved = (command) => Object.keys(savedCommands()).includes(command);

const candidates = (command) => {
  if (checkIfSaved(command)) {
    return [savedCommands()[command]];
  }

  let hasRegex = [];
  dictionary.forEach((word) => {
    const posibleRegex = new RegExp(utils.regexBuilder(word));
    if (posibleRegex.exec(command)) hasRegex.push(word);
  });
  if (hasRegex.length > 0) return hasRegex;

  let intersection = commandCombinations(command).filter((element) =>
    dictionary.includes(element)
  );
  if (intersection.length > 0) return intersection;

  intersection = combinationsOfCombinations(command).filter((element) =>
    dictionary.includes(element)
  );
  if (intersection.length > 0) return intersection;

  return {
    type: "error",
    message: `COMMAND ${command.toUpperCase()} NOT FOUND`,
  };
};

module.exports = { commandCombinations, candidates };
