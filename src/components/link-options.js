import React from 'react';

export default class LinkOptions extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='display-upper-bar link-options'>
        <span className='button'>
          <i className='fa fa-clipboard fa-fw'/>{this.props.getI18nText('copy')}
        </span>
        <span className='button'>
          <i className='fa fa-link fa-fw'/>{this.props.getI18nText('copy-address')}
        </span>
        <span className='button'>
          <i className='fa fa-window-restore fa-fw'/>{this.props.getI18nText('open-in-new-tab')}
        </span>
        <span className='button'>
          <i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}
        </span>
      </div>
    );
  }
}
