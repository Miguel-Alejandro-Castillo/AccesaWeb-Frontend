import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

let defaultIndex;

const keyboards = {
  en: {
    general: [
      ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '↤ bksp'],
      ['tab ↦', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '↵ enter'],
      ['⇧ shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
      ['accept', 'space', '@']
    ],
    shift: [
      ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '↤ bksp'],
      ['tab ↦', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '↵ enter'],
      ['⇧ shift', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'],
      ['accept', 'space', '@']
    ],
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '↤ bksp', 'accept']
  },
  es: {
    general: [
      ['º', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '\'', '¡', '↤ bksp'],
      ['tab ↦', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '`', '+'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', '´', 'ç', '↵ enter'],
      ['⇧ shift', '<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-'],
      ['accept', 'space', '@']
    ],
    shift: [
      ['ª', '!', '@', '#', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '↤ bksp'],
      ['tab ↦', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '*'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', 'Ñ', '¨', 'Ç', '↵ enter'],
      ['⇧ shift', '>', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ';', ':', '_'],
      ['accept', 'space', '@']
    ],
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '↤ bksp', 'accept']
  }
};

export default class Keyboard extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf(['general', 'shift', 'numbers']),
    getI18nText: React.PropTypes.func.isRequired,
    displayKeyboard: React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    type: 'general'
  }

  constructor(props) {
    super(props);
    this.renderLine = this.renderLine.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(key) {
    const text = key + '';
    const label = text.length > 1 ? this.props.getI18nText(text) : text;
    const className = classNames(`key-${text}`, {wide: text.length > 1});
    let index;
    if (_.isInteger(key)) {
      index = key;
    } else {
      index = defaultIndex;
      defaultIndex = defaultIndex + 1;
    }
    return (
      <button key={key} type='button' className={className}>
        <span className='text'>{label}</span>
        <span className='button' data-key={index} data-action={text}>{index}</span>
      </button>
    );
  }

  renderLine(keys, index) {
    return (
      <p key={index}>
        {keys.map(this.renderButton)}
      </p>
    );
  }

  renderButtons() {
    return (
      <div className='buttons'>
        <span className='button'>
          <i className='fa fa-keyboard-o fa-fw'/>{this.props.displayKeyboard ? this.props.getI18nText('hide-keyboard') : this.props.getI18nText('keyboard')}
        </span>
        <span className='button'>
          <i className='fa fa-eraser fa-fw'/>{this.props.getI18nText('remove')}
        </span>
        <span className='button'>
          <i className='fa fa-eraser fa-fw'/>{this.props.getI18nText('remove-line')}
        </span>
        <span className='button'>
          <i className='fa fa-eraser fa-fw'/>{this.props.getI18nText('clean-up')}
        </span>
        <span className='button'>
          <i className='fa fa-clipboard fa-fw'/>{this.props.getI18nText('paste')}
        </span>
        <span className='button'>
          <i className='fa fa-undo fa-fw'/>{this.props.getI18nText('redo')}
        </span>
        <span className='button'>
          <i className='fa fa-repeat fa-fw'/>{this.props.getI18nText('undo')}
        </span>
        <span className='button'>
          <i className='fa fa-paper-plane fa-fw'/>{this.props.getI18nText('submit')}
        </span>
        <span className='button'>
          <i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}
        </span>
      </div>
    );
  }

  render() {
    const locale = this.props.getI18nText('locale');
    defaultIndex = 10;
    return (
      <div className='display-upper-bar keyboard'>
        { !this.props.displayKeyboard ?
          <div className='message'>
            <i className='fa fa-info-circle fa-fw'/>
            <span>{this.props.getI18nText('dictate-text')}</span>
          </div> : null
        }
        {this.renderButtons()}
        { this.props.displayKeyboard ?
          keyboards[locale][this.props.type].map(this.renderLine) : null}
      </div>
    );
  }

}
