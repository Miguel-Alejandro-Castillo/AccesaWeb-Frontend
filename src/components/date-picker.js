import classnames from 'classnames';
import DayPicker from './date-picker-day-picker';
import moment from 'moment';
import React from 'react';
import WeekPicker from './date-picker-week-picker';

const pickerPropType = {
  getI18nText: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.instanceOf(Date).isRequired
};

function Tabs({options, selectedOption, getI18nText}) {
  return (
    <div className='tabs'>
      <ul className='options'>
        {options.map((option, index) => {
          const classes = classnames({active: selectedOption === option});
          return (
            <li className={classes} key={index}>
              <span className='button'>
                {getI18nText(option)}
              </span>
            </li>
          );
        })}
      </ul>
      <span className='button exit'><i className='fa fa-times-circle fa-fw'/>{getI18nText('exit')}</span>
    </div>
  );
}
Tabs.propTypes = {
  options: React.PropTypes.array.isRequired,
  selectedOption: React.PropTypes.string.isRequired,
  getI18nText: React.PropTypes.func.isRequired
};

function YearPicker({getI18nText}) {
  return (
    <div className='container years'>
      <i className='fa fa-info-circle fa-fw'/>{getI18nText('say-year-number')}
    </div>
  );
}
YearPicker.propTypes = {
  getI18nText: React.PropTypes.func.isRequired
};

function getMonths(locale) {
  const currentLocale = moment.locale();
  moment.locale(locale);
  const months = moment.months();
  moment.locale(currentLocale);
  return months;
}

function MonthPicker({selectedDate, getI18nText}) {
  const selectedMonth = moment(selectedDate).month();
  const months = getMonths(getI18nText('locale'));
  return (
    <div className='container month'>
      <ul>
        {months.map((month, index) => (
          <li key={index} className={classnames({selected: selectedMonth === index})}>
            <button className='white-button'>
              <span className='button'>{index + 1}</span> {month}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
MonthPicker.propTypes = pickerPropType;

function SecondsPicker({getI18nText}) {
  return (
    <div className='container seconds'>
      <i className='fa fa-info-circle fa-fw'/>{getI18nText('say-second-number')}
    </div>
  );
}
SecondsPicker.propTypes = {
  getI18nText: React.PropTypes.func.isRequired
};

function MinutesPicker({getI18nText}) {
  return (
    <div className='container minutes'>
      <i className='fa fa-info-circle fa-fw'/>{getI18nText('say-minute-number')}
    </div>
  );
}
MinutesPicker.propTypes = {
  getI18nText: React.PropTypes.func.isRequired
};

function HourPicker({getI18nText}) {
  return (
    <div className='container hours'>
      <i className='fa fa-info-circle fa-fw'/>{getI18nText('say-hour-number')}
    </div>
  );
}
HourPicker.propTypes = {
  getI18nText: React.PropTypes.func.isRequired
};

const pickers = {
  month: MonthPicker,
  day: DayPicker,
  year: YearPicker,
  week: WeekPicker,
  hour: HourPicker,
  minutes: MinutesPicker,
  seconds: SecondsPicker
};

export default class DatePicker extends React.Component {
  static propTypes = {
    date: React.PropTypes.instanceOf(Date).isRequired,
    formatedDate: React.PropTypes.string,
    options: React.PropTypes.array,
    selectedOption: React.PropTypes.string.isRequired,
    getI18nText: React.PropTypes.func.isRequired
  }

  render() {
    const Picker = pickers[this.props.selectedOption];
    return (
      <div className='display-upper-bar date-picker'>
        <Tabs options={this.props.options} selectedOption={this.props.selectedOption} getI18nText={this.props.getI18nText}/>
        <Picker selectedDate={this.props.date} getI18nText={this.props.getI18nText}/>
        <p>
          {moment(this.props.date).locale(this.props.getI18nText('locale')).format(this.props.getI18nText('format'))}
        </p>
      </div>
    );
  }
}
