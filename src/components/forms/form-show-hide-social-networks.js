import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { showHideSocialNetworks } from '../../services/commands/multimedia';

const chrome = window.chrome;

class FormShowHideSocialNetworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSocialNetworks: true // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this);
  }

  componentDidMount() {
    // Cargar el valor de showSocialNetworks desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.showSocialNetworks !== 'undefined') {
        this.setState({ showSocialNetworks: result.userSettings.showSocialNetworks });
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
      if (newSettings && typeof newSettings.showSocialNetworks !== 'undefined') {
        this.setState({ showSocialNetworks: newSettings.showSocialNetworks });
      }
    }
  }

  handleChange(value) {
    this.setState({ showSocialNetworks: value });
    showHideSocialNetworks(value);
  }

  render() {
    const { showSocialNetworks } = this.state;
    return (
      <div>
        <div className='radio'>
          <label>
            <input type='radio' checked={showSocialNetworks} onChange={() => this.handleChange(true)} /> <span>{getI18nText('show')}</span>
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' checked={!showSocialNetworks} onChange={() => this.handleChange(false)} /> <span>{getI18nText('hide')}</span>
          </label>
        </div>
      </div>
    );
  }
}

export default FormShowHideSocialNetworks;