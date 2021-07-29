const el = document.getElementById('nativeCommands');
let commands = [];

document.addEventListener('executeCommand', function(event) {
  const commandName = el.getAttribute('execute');
  const command = commands.find(command => command.name === commandName);
  if (command) {
    command.action();
  }
});

window.handsfreeCommands = function(newCommands) {
  commands = newCommands;
  el.setAttribute('commands', JSON.stringify(newCommands));
  document.dispatchEvent(new Event('nativeCommands'));
};
