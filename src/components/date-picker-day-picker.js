import MonthDays from './date-picker-day-picker-month-days';
import WeekDays from './date-picker-week-days';
import React from 'react';

export default class DayPicker extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.instanceOf(Date).isRequired
  }

  render() {
    return (
      <div className='container day'>
        <WeekDays getI18nText={this.props.getI18nText}/>
        <MonthDays
          highlightDays
          highlightSelectedDay
          selectedDate={this.props.selectedDate} />
      </div>
    );
  }
}
