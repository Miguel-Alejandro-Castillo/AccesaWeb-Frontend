import React from 'react';

export default class MediaControllers extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='display-upper-bar media-controls'>
        <span className='button'><i className='fa fa-play fa-fw'/>{this.props.getI18nText('play')}</span>
        <span className='button'><i className='fa fa-pause fa-fw'/>{this.props.getI18nText('pause')}</span>
        <span className='button'><i className='fa fa-stop fa-fw'/>{this.props.getI18nText('stop')}</span>
        <span className='button'><i className='fa fa-volume-off fa-fw'/>{this.props.getI18nText('mute')}</span>
        <span className='button'><i className='fa fa-volume-up fa-fw'/>{this.props.getI18nText('volume-up')}</span>
        <span className='button'><i className='fa fa-volume-down fa-fw'/>{this.props.getI18nText('volume-down')}</span>
        <span className='button'><i className='fa fa-backward fa-fw'/>{this.props.getI18nText('rewind')}</span>
        <span className='button'><i className='fa fa-forward fa-fw'/>{this.props.getI18nText('forward')}</span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }
}
