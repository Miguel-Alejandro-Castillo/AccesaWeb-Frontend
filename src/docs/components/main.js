import _ from 'lodash';
import { getI18nText } from '../i18n/i18n';
import ModuleDetail from './module-detail';
import React from 'react';

export default class Main extends React.Component {
  static propTypes = {
    itemsMenu: React.PropTypes.array.isRequired,
    removeModule: React.PropTypes.func.isRequired
  }

  getCommandsByGroup(commands, context) {
    const groups = {};
    commands.forEach(command => {
      const groupName = getI18nText(command.group, context.i18n);
      const commandName = getI18nText(command.name, context.i18n);
      const commandHelp = getI18nText(command.help, context.i18n);
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({
        name: commandName,
        help: commandHelp
      });
    });
    return groups;
  }

  getItems(items) {
    let aux_items = items.map(item => {
      if (item.name) {
        return {
          icon: item.icon,
          id: item.id,
          imported: item.imported,
          name: getI18nText(item.name, item.i18n),
          description: getI18nText(item.description, item.i18n),
          contexts: item.contexts.map(context => {
            const commands = (context.commands || []).filter(command => command.name !== '*');
            return {
              name: getI18nText(context.name || context.context, context.i18n),
              commands: this.getCommandsByGroup(commands, context),
              htmlExample: getI18nText(context.htmlExample, context.i18n),
              functionComponent: context.functionComponent
            };
          })
        };
      }
    });
    return _.compact(aux_items);
  }

  resetExtension() {
    //setea todos los datos por defecto
    console.log('lila');
  }
  render() {
    return (
      <div className='right_col module-description' role='main'>
        <h1>{getI18nText('accesa-web')}</h1>
        <div className='x_panel speech-recognizer-options'>
          <p className='speech-recognizer-mode-description'>{getI18nText('accesa-web-description')}</p>
          <button onClick={this.resetExtension}>{getI18nText('reset-extension')}</button>
        </div>
      {
          this.props.itemsMenu
            .map(itemMenu => (
              <div>
                <h1>{getI18nText(itemMenu.titleMain, itemMenu.i18n)}</h1>
                {this.getItems(itemMenu.items).sort((itemA, itemB) => itemA.name < itemB.name ? -1 : 1)
                  .map(item => <ModuleDetail
                    module={item}
                    removeModule={this.props.removeModule}
                    key={item.name}//ver
                  />)}
              </div>
            ))
        }
      </div>
    );
  }
}