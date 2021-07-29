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
            <i className='fa fa-cubes'/>
            {getI18nText('i18n-modules')}
            <span className='fa fa-chevron-down'/>
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
                <li className={classnames({'imported-module': module.imported})} key={module.name}>
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
