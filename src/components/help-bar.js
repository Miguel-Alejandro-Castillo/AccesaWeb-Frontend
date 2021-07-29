import $ from 'jquery';
import _ from 'lodash';
import React from 'react';

export default class HelpBar extends React.Component {
  static propTypes = {
    commands: React.PropTypes.array.isRequired,
    getI18nText: React.PropTypes.func.isRequired
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
      <div key={name}>
        <h4>{name}</h4>
        {this.renderGroup(commands)}
      </div>
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
      <div>
        {_.keys(groups).sort().map(groupName => this.renderGroups(groups[groupName], groupName))}
        {this.renderGroup(commands)}
      </div>
    );
  }

  componentDidMount() {
    $(this.refs.bar).css('top', window.scrollY);
  }

  render() {
    return (
      <div className='help-bar' ref='bar'>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('help-bar')}</span>
        <h3>{this.props.getI18nText('allowed-commands')}</h3>
        <ul className='body'>
          {this.renderCommands()}
        </ul>
      </div>
    );
  }
}
