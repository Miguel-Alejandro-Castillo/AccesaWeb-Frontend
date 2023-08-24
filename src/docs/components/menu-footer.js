import $ from 'jquery';
import { getI18nText } from '../i18n/i18n';
import React from 'react';
import log from 'loglevel';

function ErrorDialog({onClose}) {
  return (
    <div className='error-dialog'>
      <div className='alert alert-danger'>
        <button type='button' className='close' onClick={onClose}>
          <span aria-hidden='true'>×</span>
        </button>
        <h4>{getI18nText('i18n-error-title-importing-module')}</h4>
        <p>
          {getI18nText('i18n-error-description-importing-module')}
        </p>
        <p>
          {getI18nText('i18n-error-description-check-out-docs')}
        </p>
        <p className='text-right'>
          <button type='button' className='btn btn-default'>{getI18nText('i18n-module-docs')}</button>
        </p>
      </div>
    </div>
  );
}
ErrorDialog.propTypes = {
  onClose: React.PropTypes.func.isRequired
};

export default class Menu extends React.Component {
  static propTypes = {
    importModule: React.PropTypes.func.isRequired,
    validateModule: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showErrorDialog: false
    };
    this.handleLoadedFile = this.handleLoadedFile.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.hideErrorDialog = this.hideErrorDialog.bind(this);
  }

  scrollToModule(id) {
    $('html, body').animate({scrollTop: $(`#${id}`).offset().top});
  }

  hideErrorDialog() {
    this.setState({
      showErrorDialog: false
    });
  }

  showErrorDialog() {
    this.setState({
      showErrorDialog: true
    });
  }

  handleLoadedFile(event) {
    const source = event.target.result;
    try {
      if (this.props.validateModule(source)) {
        const moduleId = this.props.importModule(source);
        this.scrollToModule(moduleId);
        return;
      }
    } catch (error) {
      log.error(error);
    }
    this.showErrorDialog();
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleLoadedFile;
      reader.readAsText(file);
    }
  }

  render() {
    return (
      <div className='sidebar-footer'>
        {this.state.showErrorDialog ? (<ErrorDialog onClose={this.hideErrorDialog}/>) : null}
        <label className='btn btn-success btn-file'>
          <i className='fa fa-plus' aria-hidden='true'/>
          <span>{getI18nText('i18n-add-module')}</span>
          <input type='file' onChange={this.handleFileUpload} accept='text/javascript'/>
        </label>
      </div>
    );
  }
}
