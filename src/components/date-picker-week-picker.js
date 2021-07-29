import classnames from 'classnames';
import moment from 'moment';
import MonthDays from './date-picker-day-picker-month-days';
import WeekDays from './date-picker-week-days';
import React from 'react';

function getArrayOf(begin, end) {
  return Array.from(Array(end + 1).keys()).slice(begin);
}

function Week({getI18nText, selectedDate}) {
  const firstDateInMonth = moment(selectedDate).date(1);
  const lastDateInMonth = moment(selectedDate).add('months', 1).date(0);
  const weeks = getArrayOf(firstDateInMonth.week(), lastDateInMonth.week());
  const selectedWeek = moment(selectedDate).week();
  return (
    <ul className='weeks'>
      <li>{getI18nText('week')}</li>
      {weeks.map(week => <li key={week} className={classnames({selected: selectedWeek === week})}><span className='button'>{week}</span></li>)}
    </ul>
  );
}
Week.propTypes = {
  getI18nText: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.instanceOf(Date).isRequired
};

export default class DayPicker extends React.Component {
  static propTypes = {
    getI18nText: React.PropTypes.func.isRequired,
    selectedDate: React.PropTypes.instanceOf(Date).isRequired
  }

  render() {
    return (
      <div className='container week-day'>
        <Week getI18nText={this.props.getI18nText} selectedDate={this.props.selectedDate}/>
        <div className='monthContainer'>
          <WeekDays getI18nText={this.props.getI18nText} />
          <MonthDays selectedDate={this.props.selectedDate}/>
        </div>
      </div>
    );
  }
}
