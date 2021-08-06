import classnames from 'classnames';
import { getI18nText } from '../i18n/i18n';
import React from 'react';

export default class Menu extends React.Component {
  static propTypes = {
    modules: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <ul className='nav side-menu'>
        <li className='active'>
          <a>
            <i className='fa fa-cogs' />
            {getI18nText('i18n-settings')}
            <span className='fa fa-chevron-down' />
          </a>
          <ul className='nav child_menu'>
            {/*PODRIAMOS HACER QUE ACA LLAME A OTRA FUNCION DEPENDIENDO QUE OBJETO SE LE MANDA 
              ES EL QUE RENDERIZA Y MANDAR LA CONFIGURACION Y DESPUES LOS MODULOS PORQUE SINO ESTAMOS 
              REPITIENDO CODIGO 
              TENEMOS QUE HACER UN OBJETO NUEVO (Setting y lista de settings para recorrer) PARA 
              AGREGAR CADA ITEM DE CONFIGURACION DEJO EL CODIGO COMO QUEDARIA:
              this.props.settings
              .map(setting => ({
                id: setting.id,
                name: getI18nText(setting.name, setting.i18n), //I18N ES PAAR ELEGIR QUE IDIOMA MOSTAR
                imported: setting.imported
              }))
              .sort((settingA, settingB) => settingA.name < settingB.name ? -1 : 1)
              .map(setting => (
                <li className={classnames({'imported-setting': setting.imported})} key={setting.name}>
                  <a href={`#${setting.id || setting.name}`}>{setting.name}</a>
                </li>
              ))
              */
              this.props.modules
                .map(module => ({
                  id: module.id,
                  name: getI18nText(module.name, module.i18n),
                  imported: module.imported
                }))
                .sort((moduleA, moduleB) => moduleA.name < moduleB.name ? -1 : 1)
                .map(module => (
                  <li className={classnames({ 'imported-module': module.imported })} key={module.name}>
                    <a href={`#${module.id || module.name}`}>elemento de configuración</a>
                  </li>
                ))
            }
          </ul>
        </li>
        <li className='active'>
          <a>
            <i className='fa fa-cubes' />
            {getI18nText('i18n-modules')}
            <span className='fa fa-chevron-down' />
          </a>
          <ul className='nav child_menu'>
            {this.props.modules
              .map(module => ({
                id: module.id,
                name: getI18nText(module.name, module.i18n),
                imported: module.imported
              }))
              .sort((moduleA, moduleB) => moduleA.name < moduleB.name ? -1 : 1)
              .map(module => (
                <li className={classnames({ 'imported-module': module.imported })} key={module.name}>
                  <a href={`#${module.id || module.name}`}>{module.name}</a>
                </li>
              ))
            }
          </ul>
        </li>
      </ul>
    );
  }
}
