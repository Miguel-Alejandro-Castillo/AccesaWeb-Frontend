import classnames from 'classnames';
import { getI18nText } from '../i18n/i18n';
import React from 'react';


export default class Menu extends React.Component {
  static propTypes = {
    itemsMenu: React.PropTypes.array.isRequired
  }

  render() {
    return (
      <ul className='nav side-menu'>
        {
          this.props.itemsMenu
            .map(itemMenu => (
              <li className='active' key={getI18nText(itemMenu.name, itemMenu.i18n)}>
                <a>
                  <i className={itemMenu.icon} />
                  {getI18nText(itemMenu.name, itemMenu.i18n)}
                  <span className='fa fa-chevron-down' />
                </a>
                <ul className='nav child_menu'>
                  {
                    itemMenu.items
                      .map(item => ({
                        id: item.id,
                        name: getI18nText(item.name, item.i18n),
                        imported: item.imported
                      }))
                      .sort((itemA, itemB) => itemA.name < itemB.name ? -1 : 1)
                      .map(item => (
                        <li className={classnames({ 'imported-module': item.imported })} key={item.name}>
                          <a href={`#${item.id || item.name}`}>{item.name}</a>
                        </li>
                      ))
                  }
                </ul>
              </li>
            ))
        }
      </ul>
    );
  }
}
