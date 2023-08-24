import React from 'react';

export default class ImageOptions extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='display-upper-bar image-options'>
        <span className='button'>
          <i className='fa fa-clipboard fa-fw'/>{this.props.getI18nText('copy-address')}
        </span>
        <span className='button'>
          <i className='fa fa-window-restore fa-fw'/>{this.props.getI18nText('open-in-new-tab')}
        </span>
        <span className='button'>
          <i className='fa fa-download fa-fw'/>{this.props.getI18nText('download')}
        </span>
        <span className='button'>
          <i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}
        </span>
      </div>
    );
  }
}
