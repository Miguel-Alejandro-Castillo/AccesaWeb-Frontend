function changeContrast() {
    var event = new CustomEvent('modificarDOM', { detail: {action: 'changeContrast'}});
    document.dispatchEvent(event);
  } 

  export default {
    name: 'i18n-name',
    description: 'i18n-description',
    icon: 'fa fa-image',
    contexts: [
      {
        context: 'root',
        commands: [
          {
            name: 'i18n-command.change-contrast',
            action: changeContrast,
            help: 'i18n-help.change-contrast',
            group: 'i18n-group.change-contrast'
          }
        ],
        i18n: {
          en: {
            'command.change-contrast': 'change contrast',
            'help.change-contrast': 'Change contrast',
            'group.change-contrast': 'Contrast',
           
          },
          es: {
            'command.show-images': 'cambiar contraste',
            'help.show-images': 'Cambia el contraste',
            'group.show-images': 'Contraste',
           
          }
        }
      }
    ],
    i18n: {
      en: {
        'name': 'Customize',
        'description': 'This template allows you to customize the view of the pages visited'
      },
      es: {
        'name': 'Personalizar',
        'description': 'Este modulo permite personalizar la vista de las paginas visitadas'
      }
    }
  };  