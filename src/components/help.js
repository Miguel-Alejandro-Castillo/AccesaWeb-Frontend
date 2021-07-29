import React from 'react';
import _ from 'lodash';

export default class Help extends React.Component {
  static propTypes = {
    commands: React.PropTypes.array.isRequired,
    getI18nText: React.PropTypes.func.isRequired
  }

  renderCommandHelp(command) {
    return (
      <li key={command.name}>
        <h3>{command.name}</h3>
        <p>
          {command.help}
        </p>
      </li>
    );
  }

  renderGroup(group) {
    return (
      <ul>
        {_.sortBy(group).map(command => <li key={command}>{command}</li>)}
      </ul>
    );
  }

  renderGroups(commands, name) {
    return (
      <li key={name} className='command-group'>
        <h4>{name}</h4>
        {this.renderGroup(commands)}
      </li>
    );
  }

  renderCommands() {
    const groups = {};
    const commands = [];
    this.props.commands.forEach(command => {
      if (command.group) {
        if (!groups[command.group]) {
          groups[command.group] = [];
        }
        groups[command.group].push(command.name);
      } else {
        commands.push(command.name);
      }
    });

    return (
      <ul className='command-groups'>
        {_.keys(groups).sort().map(groupName => this.renderGroups(groups[groupName], groupName))}
        {this.renderGroup(commands)}
      </ul>
    );
  }

  render() {
    return (
      <div className='dialog'>
        <div className='container help'>
          <div className='header'>
            <div className='title'>
              <h2><i className='fa fa-question-circle fa-fw'/>{this.props.getI18nText('help')}</h2>
              <h3>{this.props.getI18nText('allowed-commands-in-this-context')}</h3>
            </div>
            <div>
              <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('help')}</span>
            </div>
          </div>
          <div className='body'>
            {this.renderCommands()}
          </div>
        </div>
      </div>
    );
  }
}
