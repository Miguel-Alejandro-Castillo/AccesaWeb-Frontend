import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';

function Alert({commandExecution, getI18nText}) {
  const executed = commandExecution.executed;
  const className = classnames('command-feedback', {
    failure: !executed,
    success: executed
  });
  let text = commandExecution.command;
  if (!executed) {
    text = `"${text}" ${getI18nText('command-not-available')}`;
  }
  return (
    <div className={className}>
      <p>{text}</p>
      {!executed ? (
        <p className='tip'><i className='fa fa-info-circle fa-fw'/>{getI18nText('command-not-available-help')}</p>) : null}
    </div>
  );
}
Alert.propTypes = {
  commandExecution: React.PropTypes.shape({
    command: React.PropTypes.string.isRequired,
    executed: React.PropTypes.bool.isRequired
  }).isRequired,
  getI18nText: React.PropTypes.func.isRequired
};

export default class CommandFeedback extends React.Component {
  static propTypes = {
    commandExecution: React.PropTypes.shape({
      command: React.PropTypes.string.isRequired,
      executed: React.PropTypes.bool.isRequired
    }),
    getI18nText: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      displayAlert: false
    };
    this.displayAlert = this.displayAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  displayAlert(props) {
    if (this.state.displayAlert) {
      this.hideAlert();
      _.defer(() => this.displayAlert(props));
    } else {
      const time = props.commandExecution.executed ? 4000 : 7000;
      this.setState({
        displayAlert: true,
        hideAlertTimeout: setTimeout(this.hideAlert, time)
      });
    }
  }

  hideAlert() {
    this.setState({
      displayAlert: false
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.commandExecution && this.props.commandExecution !== newProps.commandExecution) {
      clearTimeout(this.state.hideAlertTimeout);
      this.displayAlert(newProps);
    }
  }

  render() {
    return (
      <VelocityTransitionGroup
        enter={{animation: 'transition.slideUpIn', duration: 500}}
        leave={{animation: 'transition.slideDownOut', duration: 200}}>
        {this.state.displayAlert && this.props.commandExecution ?
          <Alert
            commandExecution={this.props.commandExecution}
            getI18nText={this.props.getI18nText}/> : null}
      </VelocityTransitionGroup>
    );
  }
}
