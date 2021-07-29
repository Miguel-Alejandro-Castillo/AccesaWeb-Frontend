import _ from 'lodash';

export function getNumber(commands) {
  let newCommands = commands.map(command => {
    let newCommand = command.text.toLowerCase().replace('number', '').replace('número', '').replace('numero', '').trim();
    return parseInt(newCommand, 10);
  });
  newCommands = newCommands.filter(command => _.isInteger(command));
  return newCommands[0];
}

export function getNumbersUntil(n) {
  return [...Array(n).keys()].map(key => `${key}`);
};
