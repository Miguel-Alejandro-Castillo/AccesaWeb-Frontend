export function executeBackgroundAction(action) {
  window.chrome.extension.sendMessage(action);
}
