import {
  getI18nText
} from '../i18n/i18n';
import classnames from 'classnames';
import React from 'react';

export default class TopBar extends React.Component {
  static propTypes = {
    currentLanguage: React.PropTypes.string.isRequired,
    setLanguage: React.PropTypes.func.isRequired
  }

  render() {
    const currentLanguage = this.props.currentLanguage.split('-')[0];
    const enButton = classnames('btn', {
      'btn-default': currentLanguage !== 'en',
      'btn-primary': currentLanguage === 'en'
    });
    const esButton = classnames('btn', {
      'btn-default': currentLanguage !== 'es',
      'btn-primary': currentLanguage === 'es'
    });
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <div className='btn-group' data-toggle='buttons'>
            <label onClick={() => this.props.setLanguage('en')} className={enButton}>
              <input type='radio'/>{getI18nText('i18n-english')}
            </label>
            <label onClick={() => this.props.setLanguage('es')} className={esButton}>
              <input type='radio'/>{getI18nText('i18n-spanish')}
            </label>
          </div>
        </li>
      </ul>
    );
  }
}
