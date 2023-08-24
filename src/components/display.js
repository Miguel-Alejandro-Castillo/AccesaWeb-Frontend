import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import log from 'loglevel';

export default class Display extends React.Component {
  static propTypes = {
    contextName: React.PropTypes.string,
    commandExecution: React.PropTypes.shape({
      executed: React.PropTypes.bool.isRequired
    }),
    fireCommand: React.PropTypes.func.isRequired,
    speechRecognizerState: React.PropTypes.shape({
      error: React.PropTypes.string,
      final: React.PropTypes.bool.isRequired,
      recording: React.PropTypes.bool.isRequired,
      restarting: React.PropTypes.bool.isRequired,
      starting: React.PropTypes.bool.isRequired,
      text: React.PropTypes.array.isRequired
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      speechRecognizer: props.speechRecognizerState || {
        connecting: false,
        error: false,
        final: false,
        recording: false,
        text: []
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.speechRecognizerState && this.props.speechRecognizerState !== nextProps.speechRecognizerState) {
      this.handleSpeechRecognizerState(nextProps.speechRecognizerState);
    }
  }

  resetSpeechRecognizerText() {
    this.setState({
      speechRecognizer: {
        ...this.state.speechRecognizer,
        final: false,
        text: []
      }
    });
  }

  handleCommand(command) {
    this.props.fireCommand(command.map(command => ({
      ...command,
      text: command.text.trim()
    })));
  }

  handleSpeechRecognizerState(speechRecognizerState) {
    const gotNewText = speechRecognizerState.text.length > 0;
    const connecting = speechRecognizerState.restarting || speechRecognizerState.starting;
    const error = speechRecognizerState.error;
    const recording = speechRecognizerState.recording || gotNewText || this.state.speechRecognizer.text.length;
    let newSpeechRecognizerState = {
      connecting,
      error,
      final: speechRecognizerState.final,
      recording,
      text: gotNewText ? speechRecognizerState.text : this.state.speechRecognizer.text
    };

    if (!speechRecognizerState.recording) {
      newSpeechRecognizerState.final = true;
    }

    log.info(newSpeechRecognizerState);
    if (newSpeechRecognizerState.text.length && newSpeechRecognizerState.final) {
      log.info('fire', newSpeechRecognizerState.text);
      this.handleCommand(newSpeechRecognizerState.text);
      this.resetSpeechRecognizerText();
    } else {
      this.setState({
        speechRecognizer: newSpeechRecognizerState
      });
    }
  }

  renderCommandContext() {
    if (this.props.contextName) {
      return (<span className='context'>{this.props.contextName}</span>);
    }
  }

  render() {
    const speechRecognizerStateIcon = classnames('fa', 'fa-fw', {
      'fa-refresh fa-spin': this.state.speechRecognizer.connecting,
      'fa-exclamation-circle': this.state.speechRecognizer.error,
      'fa-microphone': this.state.speechRecognizer.recording,
      'fa-microphone-slash': !_.some([this.state.speechRecognizer.connecting, this.state.speechRecognizer.error, this.state.speechRecognizer.recording])
    });

    const commandTextClasses = classnames('current-command', {final: this.state.speechRecognizer.final});
    const text = this.state.speechRecognizer.text[0] && this.state.speechRecognizer.text[0].text;

    return (
      <div className='display'>
        <div className='status'>
          <div className='command'>
            {this.renderCommandContext()}
            <span className={commandTextClasses}>{text}</span>
          </div>
          <span className='status-icon-container'>
            <i className={speechRecognizerStateIcon}/>
          </span>
        </div>
      </div>
    );
  }
}
