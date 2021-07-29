import classnames from 'classnames';
import moment from 'moment';
import React from 'react';

export default class MonthDays extends React.Component {
  static propTypes = {
    highlightDays: React.PropTypes.bool,
    highlightSelectedDay: React.PropTypes.bool,
    selectedDate: React.PropTypes.instanceOf(Date).isRequired
  }

  getArrayOf(number) {
    return Array.from(Array(number).keys());
  }

  getPreviousDays(lastDay, daysToDisplay) {
    return this.getArrayOf(lastDay).slice(-daysToDisplay).map(day => (
      <li key={`p${day + 1}`}>{day + 1}</li>
    ));
  }

  getDays(daysToDisplay, selectedDate) {
    return this.getArrayOf(daysToDisplay).map(index => {
      const date = index + 1;
      const liClass = classnames({selected: this.props.highlightSelectedDay && selectedDate === date});
      const spanClass = classnames({button: this.props.highlightDays});
      return (
        <li key={date} className={liClass}>
          <span className={spanClass}>{date}</span>
        </li>
      );
    });
  }

  getFollowingMonthDays(daysToDisplay) {
    return this.getArrayOf(daysToDisplay).map(day => (
      <li key={`f${day + 1}`}>{day + 1}</li>
    ));
  }

  render() {
    const daysInMonth = moment(this.props.selectedDate).daysInMonth();
    const daysInPreviousMonth = moment(this.props.selectedDate).subtract(1, 'month').daysInMonth();
    const firstDayOfTheMonth = moment(this.props.selectedDate).date(1).day();
    const lastDayOfTheMonth = moment(this.props.selectedDate).date(daysInMonth).day();
    const date = moment(this.props.selectedDate).date();
    const days = [
      ...this.getPreviousDays(daysInPreviousMonth, firstDayOfTheMonth),
      ...this.getDays(daysInMonth, date),
      ...this.getFollowingMonthDays(6 - lastDayOfTheMonth)
    ];
    return (
      <ul className='monthDays'>{days}</ul>
    );
  }
}
