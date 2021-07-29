import _ from 'lodash';
import $ from 'jquery';

export function onNativeCommandsChange(cb) {
  document.addEventListener('nativeCommands', (event) => {
    let newCommands = $('#nativeCommands').attr('commands');
    try {
      newCommands = JSON.parse(newCommands);
    } catch (err) {
      console.error(err);
    }
    if (_.isArray(newCommands)) {
      newCommands = newCommands.map(command => ({...command, nativeCommand: true}));
      cb(newCommands);
    }
  });
}

export function executeNativeCommand(command) {
  $('#nativeCommands').attr('execute', command.name);
  document.dispatchEvent(new Event('executeCommand'));
}
