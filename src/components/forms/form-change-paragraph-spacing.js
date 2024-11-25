import React, { Component } from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
import { changeParagraphSpacing } from '../../services/commands/format';

const chrome = window.chrome;
const options = [
  {
    label: getI18nText('none'),
    value: 'none'
  },
  {
    label: '2.0',
    value: '2'
  },
  {
    label: '2.25',
    value: '2.25'
  },
  {
    label: '2.5',
    value: '2.50'
  }
];

class FormChangeParagraphSpacing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeParagraphSpacing: 'none' // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de changeParagraphSpacing desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.changeParagraphSpacing !== 'undefined') {
        this.setState({ changeParagraphSpacing: result.userSettings.changeParagraphSpacing });
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
      if (newSettings && typeof newSettings.changeParagraphSpacing !== 'undefined') {
        this.setState({ changeParagraphSpacing: newSettings.changeParagraphSpacing });
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ changeParagraphSpacing: value });
    changeParagraphSpacing(value);
  }
  
  render() {
    const { changeParagraphSpacing } = this.state;
    return (
      <div className='form-group'>
        <div className='col-lg-3'>
          <label>{getI18nText('select-a-spacing')}</label><br />
          <select className="form-control {'_not-focuseable-element'}" value={changeParagraphSpacing} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default FormChangeParagraphSpacing;