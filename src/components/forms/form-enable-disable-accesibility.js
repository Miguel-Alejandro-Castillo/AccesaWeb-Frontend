import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { enableDisableAccessibilityHTML } from '../../services/commands/accessibility';

const chrome = window.chrome;

class FormEnableDisableAccesibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableAccesibilityHTML: true // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  componentDidMount() {
    // Cargar el valor de enableAccesibilityHTML desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.enableAccesibilityHTML !== 'undefined') {
        this.setState({ enableAccesibilityHTML: result.userSettings.enableAccesibilityHTML });
      }
    });

    // Escuchar cambios en el almacenamiento
    chrome.storage.onChanged.addListener(this.handleStorageChange);
  }

  componentWillUnmount() {
    // Eliminar el listener de cambios en el almacenamiento
    chrome.storage.onChanged.removeListener(this.handleStorageChange);
  }

  handleStorageChange(changes, namespace) {
    if (namespace === 'local' && changes.userSettings) {
      const newSettings = changes.userSettings.newValue;
      if (newSettings && typeof newSettings.enableAccesibilityHTML !== 'undefined') {
        this.setState({ enableAccesibilityHTML: newSettings.enableAccesibilityHTML });
      }
    }
  }

  handleChange(value) {
    this.setState({ enableAccesibilityHTML: value });
    enableDisableAccessibilityHTML(value);
  }

  render() {
    const { enableAccesibilityHTML } = this.state;
    return (
      <div>
        <div className='radio'>
          <label>
            <input type='radio' checked={enableAccesibilityHTML} onChange={() => this.handleChange(true)} /> <span>{getI18nText('activate')}</span>
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' checked={!enableAccesibilityHTML} onChange={() => this.handleChange(false)} /> <span>{getI18nText('desactivate')}</span>
          </label>
        </div>
      </div>
    );
  }
}

export default FormEnableDisableAccesibility;