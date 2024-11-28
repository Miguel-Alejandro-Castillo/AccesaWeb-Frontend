import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { changeFont } from '../../services/commands/format';

const chrome = window.chrome;
const options = [
  {
    label: getI18nText('none'),
    value: 'none'
  },
  {
    label: getI18nText('arial'),
    value: 'arial'
  },
  {
    label: getI18nText('dyslexic'),
    value: 'opendyslexic'
  }
];

class FormChangeFont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeFont: 'none' // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de showImages desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.changeFont !== 'undefined') {
        this.setState({ changeFont: result.userSettings.changeFont });
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
      if (newSettings && typeof newSettings.changeFont !== 'undefined') {
        this.setState({ changeFont: newSettings.changeFont });
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ changeFont: value });
    changeFont(value);
  }
  render() {
    const { changeFont } = this.state;
    return (
      <div className='form-group'>
        <div className='col-lg-3'>
          <label>{getI18nText('select-a-font')}</label><br />
          <select id='font-type' className="form-control {'_not-focuseable-element'}" value={changeFont} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default FormChangeFont;