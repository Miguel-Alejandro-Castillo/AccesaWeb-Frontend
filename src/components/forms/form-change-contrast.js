import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { changeContrast } from '../../services/commands/customize';

const chrome = window.chrome;
const options = [
  {
    label: getI18nText('none'),
    value: 'none'
  },
  {
    label: getI18nText('whiteBlack'),
    value: 'whiteBlack'
  },
  {
    label: getI18nText('blackWhite'),
    value: 'blackWhite'
  },
  {
    label: getI18nText('yellowBlack'),
    value: 'yellowBlack'
  },
  {
    label: getI18nText('blackYellow'),
    value: 'blackYellow'
  }
];

class FormChangeContrast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeContrast: 'none' // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de showImages desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.changeContrast !== 'undefined') {
        this.setState({ changeContrast: result.userSettings.changeContrast });
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
      if (newSettings && typeof newSettings.changeContrast !== 'undefined') {
        this.setState({ changeContrast: newSettings.changeContrast });
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ changeContrast: value });
    changeContrast(value);
  }

  render() {
    const { changeContrast } = this.state;
    return (
      <div className='form-group'>
        <div className='col-lg-3'>
          <label>{getI18nText('select-a-contrast')}</label><br />
          <select id='contrast' className="form-control {'_not-focuseable-element'}" value={changeContrast} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default FormChangeContrast;