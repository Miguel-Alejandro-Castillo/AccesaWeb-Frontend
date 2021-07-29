import React from 'react';

export default class RangeOptions extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    max: React.PropTypes.number.isRequired,
    min: React.PropTypes.number.isRequired,
    selectedNumber: React.PropTypes.number.isRequired
  }

  render() {
    const message = `${this.props.getI18nText('say-a-number-between')} ${this.props.min} ${this.props.getI18nText('and')} ${this.props.max}`;
    return (
      <div className='display-upper-bar range-options'>
        <span className='message'>
          <i className='fa fa-info-circle fa-fw'/>
          <span>{message}</span>
        </span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }
}
