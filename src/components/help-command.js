import React from 'react';

export default class HelpCommand extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    context: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div className='display-upper-bar open-options'>
        <span className='message'>
          <i className='fa fa-info-circle fa-fw'/>
          <span>{this.props.getI18nText(this.props.context + '-params')}</span>
        </span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }
}
