import classnames from 'classnames';
import React from 'react';

export default class OptionsSelector extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    options: React.PropTypes.array.isRequired
  }

  renderOption(option, index) {
    index = index + 1;
    const classes = classnames('option-name', {selected: option.selected});
    return (
      <li key={index}>
        <span className='button' data-key={index} data-value={option.value}>{index}</span>
        <span className={classes}>{option.label}</span>
      </li>
    );
  }

  render() {
    return (
      <div className='display-upper-bar options-selector'>
        <div className='header'>
          <h3>{this.props.getI18nText('select-an-option')}</h3>
          <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
        </div>
        <p className='body-header'>
          <span className='button'><i className='fa fa-arrow-up fa-fw'/>{this.props.getI18nText('scroll-up')}</span>
        </p>
        <ul>{this.props.options.map(this.renderOption)}</ul>
        <p className='body-footer'>
          <span className='button'><i className='fa fa-arrow-down fa-fw'/>{this.props.getI18nText('scroll-down')}</span>
        </p>
      </div>
    );
  }
}
