import _ from 'lodash';
import { getI18nText } from '../i18n/i18n';
import ModuleDetail from './module-detail';
import React from 'react';

export default class Main extends React.Component {
  static propTypes = {
    removeModule: React.PropTypes.func.isRequired,
    modules: React.PropTypes.array.isRequired,
    setContinuousMode: React.PropTypes.func.isRequired,
    continuousMode: React.PropTypes.bool.isRequired
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

  getModules() {
    let modules = this.props.modules.map(module => {
      if (module.name) {
        return {
          icon: module.icon,
          id: module.id,
          imported: module.imported,
          name: getI18nText(module.name, module.i18n),
          description: getI18nText(module.description, module.i18n),
          contexts: module.contexts.map(context => {
            const commands = (context.commands || []).filter(command => command.name !== '*');
            return {
              name: getI18nText(context.name || context.context, context.i18n),
              commands: this.getCommandsByGroup(commands, context),
              htmlExample: getI18nText(context.htmlExample, context.i18n)
            };
          })
        };
      }
    });
    return _.compact(modules);
  }

  render() {
    return (
      <div className='right_col module-description' role='main'>
        <h1>{getI18nText('speech-recognizer-mode')}</h1>
        <div className='x_panel speech-recognizer-options'>
          <p className='speech-recognizer-mode-description'>{getI18nText('speech-recognizer-mode-description')}</p>
          <div className='radio'>
            <label>
              <input type='radio' checked={this.props.continuousMode} onChange={() => this.props.setContinuousMode(true)}/> <span>{getI18nText('continuous-mode')}</span>
            </label>
            <p>{getI18nText('continuous-mode-description')}</p>
          </div>
          <div className='radio'>
            <label>
              <input type='radio' checked={!this.props.continuousMode} onChange={() => this.props.setContinuousMode(false)}/> <span>{getI18nText('intermittent-mode')}</span>
            </label>
            <p>{getI18nText('intermittent-mode-description')}</p>
          </div>
        </div>

        <h1>{getI18nText('active-modules')}</h1>
        {this.getModules()
          .sort((moduleA, moduleB) => moduleA.name < moduleB.name ? -1 : 1)
          .map(module => <ModuleDetail
            module={module}
            removeModule={this.props.removeModule}
            key={module.name}
          />)}
      </div>
    );
  }
}
