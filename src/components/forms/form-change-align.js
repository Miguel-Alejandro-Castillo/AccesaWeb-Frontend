import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { changeTextAlign } from '../../services/commands/format';

const chrome = window.chrome;

class FormChangeTextAlign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeTextAlign: 'none' // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de showImages desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.changeTextAlign !== 'undefined') {
        this.setState({ changeTextAlign: result.userSettings.changeTextAlign });
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
      if (newSettings && typeof newSettings.changeTextAlign !== 'undefined') {
        this.setState({ changeTextAlign: newSettings.changeTextAlign });
      }
    }
  }

  handleChange(value) {
    this.setState({ changeTextAlign: value });
    changeTextAlign(value);
  }  
  render() {
    const { changeTextAlign } = this.state;
    return (
      <div className='btn-group' role='group' aria-label='opciones de alineado'>
        <button className={`btn btn-default ${changeTextAlign === 'none' ? 'active' : ''}`} onClick={() => this.handleChange('none')}>{getI18nText('none')}</button>
        <button className={`btn btn-default ${changeTextAlign === 'left' ? 'active' : ''}`} onClick={() => this.handleChange('left')}><i className='fa fa-align-left' />{getI18nText('left')}</button>
        <button className={`btn btn-default ${changeTextAlign === 'center' ? 'active' : ''}`} onClick={() => this.handleChange('center')}><i className='fa fa-align-center' />{getI18nText('center')}</button>
        <button className={`btn btn-default ${changeTextAlign === 'justify' ? 'active' : ''}`} onClick={() => this.handleChange('justify')}><i className='fa fa-align-justify' />{getI18nText('justify')}</button>
        <button className={`btn btn-default ${changeTextAlign === 'right' ? 'active' : ''}`} onClick={() => this.handleChange('right')}><i className='fa fa-align-right' />{getI18nText('right')}</button>
      </div>
    );
  }
}

export default FormChangeTextAlign;