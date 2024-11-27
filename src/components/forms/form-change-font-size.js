import React, { Component } from 'react';
import { changeFontSize } from '../../services/commands/format';

const chrome = window.chrome;

class FormChangeFontSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeFontSize: 100 // Valor por defecto mientras se carga el valor real
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStorageChange = this.handleStorageChange.bind(this); // Enlazar el método
  }

  componentDidMount() {
    // Cargar el valor de showImages desde chrome.storage
    chrome.storage.local.get('userSettings', (result) => {
      if (result.userSettings && typeof result.userSettings.changeFontSize !== 'undefined') {
        this.setState({ changeFontSize: result.userSettings.changeFontSize });
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
      if (newSettings && typeof newSettings.changeFontSize !== 'undefined') {
        this.setState({ changeFontSize: newSettings.changeFontSize });
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ changeFontSize: value });
    changeFontSize(value);
  }

  render() {
    const { changeFontSize } = this.state;
    return (
      <p className='box'>
        <input type='range' width='50' min='50' max='200' step='10' className='e-range _not-focuseable-element' value={changeFontSize} onChange={this.handleChange} />
        <label id='value'>{changeFontSize + '%'}</label>
      </p>
    );
  }
}

export default FormChangeFontSize;