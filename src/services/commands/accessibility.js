import { executeBackgroundAction } from './background';

function disableAccessibilityHTML() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'enableAccessibilityHTML',
      param: false
    }
  });
}

function enableAccessibilityHTML() {
  executeBackgroundAction({
    modifyDOM: {
      action: 'enableAccessibilityHTML',
      param: true
    }
  });
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
          name: 'i18n-command.disable-accessibility',
          action: disableAccessibilityHTML,
          help: 'i18n-help.disable-accessibility',
          group: 'i18n-group.disable-accessibility'
        },
        {
          name: 'i18n-command.enable-accessibility',
          action: enableAccessibilityHTML,
          help: 'i18n-help.enable-accessibility',
          group: 'i18n-group.enable-accessibility'
        }],
      i18n: {
        en: {
          'command.disable-accessibility': 'Disable accessibility',
          'help.disable-accessibility': 'disable HTML accessibility',
          'group.disable-accessibility': 'Accessibility',
          'command.enable-accessibility': 'Enable accessibility',
          'help.enable-accessibility': 'enable HTML accessibility',
          'group.enable-accessibility': 'Accessibility'
        },
        es: {
          'command.disable-accessibility': 'Desactivar accesibilidad',
          'help.disable-accessibility': 'Desactiva la accesibilidad HTML',
          'group.disable-accessibility': 'Accesibilidad',
          'command.enable-accessibility': 'Activar accesibilidad',
          'help.enable-accessibility': 'Activa la accesibilidad HTML',
          'group.enable-accessibility': 'Accesibilidad'
        }
      }
    }
  ],
  i18n: {
    en: {
      'name': 'Accessibility',
      'description': 'This module allows you to activate HTML accessibility'
    },
    es: {
      'name': 'Accesibilidad',
      'description': 'EEste modulo permite activar la accesibilidad HTML'
    }
  }
};