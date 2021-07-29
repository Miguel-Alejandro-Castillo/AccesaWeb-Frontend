import React from 'react';

export default class TextOptions extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    return (
       <div className='display-upper-bar text-options'>
        <span className='button'><i className='fa fa-clipboard fa-fw'/>{this.props.getI18nText('copy')}</span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }
}
