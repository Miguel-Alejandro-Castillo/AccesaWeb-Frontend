export default function fontAwesome(getUrl) {
  return `
    @font-face {
      font-family: 'FontAwesome';
      src: url('${getUrl('/font-awesome/fontawesome-webfont.eot')}') format("eot"),
           url('${getUrl('/font-awesome/fontawesome-webfont.woff2')}') format('woff2'),
           url('${getUrl('/font-awesome/fontawesome-webfont.woff')}') format('woff'),
           url('${getUrl('/font-awesome/fontawesome-webfont.ttf')}') format('truetype'),
           url('${getUrl('/font-awesome/fontawesome-webfont.svg#fontawesomeregular')}') format('svg');
      font-weight: normal;
      font-style: normal;
    }
  `;
}
