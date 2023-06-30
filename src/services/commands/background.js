export function executeBackgroundAction(action) {
  window.chrome.runtime.sendMessage(action);
}
