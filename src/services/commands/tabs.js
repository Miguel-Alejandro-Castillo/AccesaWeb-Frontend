import { executeBackgroundAction } from './background';

export function newTab() {
  executeBackgroundAction({newTab: 'https://google.com'});
}

function closeTab() {
  executeBackgroundAction({closeTab: true});
}

function nextTab() {
  executeBackgroundAction({nextTab: true});
}

function previousTab() {
  executeBackgroundAction({previousTab: true});
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-window-restore',
  contexts: [{
    context: 'root',
    commands: [{
      name: 'i18n-command.new-tab',
      help: 'i18n-help.new-tab',
      action: newTab,
      group: 'i18n-group.tab'
    }, {
      name: 'i18n-command.close-tab',
      help: 'i18n-help.close-tab',
      action: closeTab,
      group: 'i18n-group.tab'
    }, {
      name: 'i18n-command.next-tab',
      help: 'i18n-help.next-tab',
      action: nextTab,
      group: 'i18n-group.tab'
    }, {
      name: 'i18n-command.previous-tab',
      help: 'i18n-help.previous-tab',
      action: previousTab,
      group: 'i18n-group.tab'
    }],
    i18n: {
      en: {
        'group.tab': 'Tabs',
        'command.new-tab': 'new tab',
        'help.new-tab': 'Opens a new tab',
        'command.close-tab': 'close tab',
        'help.close-tab': 'Closes the current tab',
        'command.next-tab': 'next tab',
        'help.next-tab': 'Switches to the following tab',
        'command.previous-tab': 'previous tab',
        'help.previous-tab': 'Switches to the previous tab'
      },
      es: {
        'group.tab': 'Pestañas',
        'command.new-tab': 'nueva pestaña',
        'help.new-tab': 'Abrir una nueva pestaña',
        'command.close-tab': 'cerrar pestaña',
        'help.close-tab': 'Cerrar una pestaña',
        'command.next-tab': 'siguiente pestaña',
        'help.next-tab': 'Cambiar a la siguiente pestaña',
        'command.previous-tab': 'anterior pestaña',
        'help.previous-tab': 'Cambiar a la anterior pestaña'
      }
    }
  }],
  i18n: {
    en: {
      'name': 'Tabs',
      'description': 'This module allows you to manage the browser tabs.'
    },
    es: {
      'name': 'Pestañas',
      'description': 'Este módulo permite administrar las pestañas.'
    }
  }
};

