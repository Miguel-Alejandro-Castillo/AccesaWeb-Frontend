import React from 'react';

export default class PickLabelOptions extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='display-upper-bar pick-label-options'>
        <span className='message'>
          <i className='fa fa-info-circle fa-fw'/>
          <span>{this.props.getI18nText('label-options')}</span>
        </span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }
}
