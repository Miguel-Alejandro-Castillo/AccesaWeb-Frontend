import { executeBackgroundAction } from './background';

export function enableDisableAccessibilityHTML(value) {
  executeBackgroundAction({
    modifyDOM: {
      action: 'enableAccesibilityHTML',
      param: value
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
          action: () => enableDisableAccessibilityHTML(false),
          help: 'i18n-help.disable-accessibility',
          group: 'i18n-group.disable-accessibility'
        },
        {
          name: 'i18n-command.enable-accessibility',
          action: () => enableDisableAccessibilityHTML(true),
          help: 'i18n-help.enable-accessibility',
          group: 'i18n-group.enable-accessibility'
        }],
      i18n: {
        en: {
          'command.disable-accessibility': 'disable accessibility',
          'help.disable-accessibility': 'disable HTML accessibility',
          'group.disable-accessibility': 'Accessibility',
          'command.enable-accessibility': 'enable accessibility',
          'help.enable-accessibility': 'Enable HTML accessibility',
          'group.enable-accessibility': 'Accessibility'
        },
        es: {
          'command.disable-accessibility': 'desactivar accesibilidad',
          'help.disable-accessibility': 'Desactiva la accesibilidad HTML',
          'group.disable-accessibility': 'Accesibilidad',
          'command.enable-accessibility': 'activar accesibilidad',
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
      'description': 'Este modulo permite activar la accesibilidad HTML'
    }
  }
};