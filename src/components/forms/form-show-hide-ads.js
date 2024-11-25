import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { showHideAds } from '../../services/commands/multimedia';

const chrome = window.chrome;

class FormShowHideAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAds: true // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  componentDidMount() {
    // Cargar el valor de showAds desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.showAds !== 'undefined') {
        this.setState({ showAds: result.userSettings.showAds });
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
      if (newSettings && typeof newSettings.showAds !== 'undefined') {
        this.setState({ showAds: newSettings.showAds });
      }
    }
  }

  handleChange(value) {
    this.setState({ showAds: value });
    showHideAds(value);
  }

  render() {
    const { showAds } = this.state;
    return (
      <div>
        <div className='radio'>
          <label>
            <input type='radio' checked={showAds} onChange={() => this.handleChange(true)} /> <span>{getI18nText('show')}</span>
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' checked={!showAds} onChange={() => this.handleChange(false)} /> <span>{getI18nText('hide')}</span>
          </label>
        </div>
      </div>
    );
  }
}

export default FormShowHideAds;