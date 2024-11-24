import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { showHideImages } from '../../services/commands/multimedia';

const chrome = window.chrome;

class FormShowHideImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImages: true // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de showImages desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.showImages !== 'undefined') {
        this.setState({ showImages: result.userSettings.showImages });
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
      if (newSettings && typeof newSettings.showImages !== 'undefined') {
        this.setState({ showImages: newSettings.showImages });
      }
    }
  }

  handleChange(value) {
    this.setState({ showImages: value });
    showHideImages(value);
  }

  render() {
    const { showImages } = this.state;
    return (
      <div>
        <div className='radio'>
          <label>
            <input type='radio' checked={showImages} onChange={() => this.handleChange(true)} /> <span>{getI18nText('show')}</span>
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' checked={!showImages} onChange={() => this.handleChange(false)} /> <span>{getI18nText('hide')}</span>
          </label>
        </div>
      </div>
    );
  }
}

export default FormShowHideImages;