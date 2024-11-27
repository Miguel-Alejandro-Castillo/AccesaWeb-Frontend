import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { changeLineSpacing } from '../../services/commands/format';

const chrome = window.chrome;
const options = [
  {
    label: getI18nText('none'),
    value: 'none'
  },
  {
    label: '1,5',
    value: '1.5'
  },
  {
    label: '1,75',
    value: '1.75'
  },
  {
    label: '2,0',
    value: '2'
  }
];

class FormChangeLineSpacing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeLineSpacing: 'none' // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de changeLineSpacing desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.changeLineSpacing !== 'undefined') {
        this.setState({ changeLineSpacing: result.userSettings.changeLineSpacing });
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
      if (newSettings && typeof newSettings.changeLineSpacing !== 'undefined') {
        this.setState({ changeLineSpacing: newSettings.changeLineSpacing });
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ changeLineSpacing: value });
    changeLineSpacing(value);
  }

  render() {
    const { changeLineSpacing } = this.state;
    return (
      <div className='form-group'>
        <div className='col-lg-3'>
          <label>{getI18nText('select-a-spacing')}</label><br />
          <select className="form-control {'_not-focuseable-element'}" value={changeLineSpacing} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default FormChangeLineSpacing;