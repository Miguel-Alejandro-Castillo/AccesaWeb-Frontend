import React from 'react';
import { getI18nText } from '../../docs/i18n/i18n';
//import $ from 'jquery';

const propertySettingLocalStorage = 'input.name.expandedMenu';

function Form({isExpandedMenu, onChangeExpandedMenu}) {
  return (
    <div>
      <div className='radio'>
        <label>
          <input type='radio' checked={isExpandedMenu} onChange={() => onChangeExpandedMenu(true)}/> <span>{getI18nText('activate')}</span>
        </label>
      </div>
      <div className='radio'>
        <label>
          <input type='radio' checked={!isExpandedMenu} onChange={() => onChangeExpandedMenu(false)}/> <span>{getI18nText('desactivate')}</span>
        </label>
      </div>
    </div>
  );
}

Form.propTypes = {
  isExpandedMenu: React.PropTypes.bool.isRequired,
  onChangeExpandedMenu: React.PropTypes.func.isRequired
};


function isExpandedMenu() {
  return localStorage.getItem(propertySettingLocalStorage) === 'false' ? false : true;
}

function setExpandedMenu(value) {
  if (isExpandedMenu() !== value) {
    localStorage.setItem(propertySettingLocalStorage, value);
    document.dispatchEvent(new Event('changeInput'));
  }
}

function action(valueSetting) {
  if (valueSetting === 'false') {
    //desactivar
  } else {
   //activar
  }
}

function ShowExpandedMenuFunction() {
  return (
    <Form isExpandedMenu={isExpandedMenu()} onChangeExpandedMenu={setExpandedMenu}/>
  );
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-expand',
  i18n: {
    en: {
      'name': 'Change expanded menu',
      'description': 'displays all the menu options.'
    },
    es: {
      'name': 'Cambiar a menu expandido.',
      'description': 'Despliega todas las opciones en los menus.'
    }
  },
  contexts: [{ functionComponent: ShowExpandedMenuFunction }],
  propertySettingLocalStorage: propertySettingLocalStorage,
  'action': action
};