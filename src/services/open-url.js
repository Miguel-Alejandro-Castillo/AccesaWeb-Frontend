export default function openUrl(url) {
  if (location.protocol === 'chrome-extension:') {
    let win = window.open(url, '_blank');
    win.focus();
  } else {
    window.location.href = url;
  }
}
