import _ from 'lodash';
import React from 'react';

export default class FindText extends React.Component {
  static propTypes = {
    findingText: React.PropTypes.bool,
    getI18nText: React.PropTypes.func.isRequired,
    submitTextToFind: React.PropTypes.func.isRequired,
    updateSelectedElement: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.submitTextToFind = this.submitTextToFind.bind(this);
  }

  componentDidMount() {
    this.props.updateSelectedElement(this.refs.text);
    this.refs.text.addEventListener('ready', this.submitTextToFind, false);
  }

  submitTextToFind(event) {
    const text = this.refs.text.value;
    _.defer(() => this.props.submitTextToFind(text));
  }

  renderOptions() {
    if (this.props.findingText) {
      return (
        <div>
          <span className='button'><i className='fa fa-arrow-left fa-fw'/>{this.props.getI18nText('previous')}</span>
          <span className='button'><i className='fa fa-arrow-right fa-fw'/>{this.props.getI18nText('next')}</span>
          <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
        </div>
      );
    }
    return (
      <div>
        <span className='button'><i className='fa fa-paper-plane fa-fw'/>{this.props.getI18nText('submit')}</span>
        <span className='button'><i className='fa fa-times-circle fa-fw'/>{this.props.getI18nText('exit')}</span>
      </div>
    );
  }

  render() {
    return (
       <div className='display-upper-bar find-text'>
        <input type='text' ref='text' data-submit='ready-event'/>
        {this.renderOptions()}
      </div>
    );
  }
}
