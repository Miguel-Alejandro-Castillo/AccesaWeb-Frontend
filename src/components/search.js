import React from 'react';

export default class TextOptions extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='display-upper-bar search-options'>
        <span className='message'>
          <i className='fa fa-info-circle fa-fw'/>
          <span>{this.props.getI18nText('search-params')}</span>
        </span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }
}
