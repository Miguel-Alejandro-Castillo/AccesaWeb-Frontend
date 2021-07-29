import moment from 'moment';
import React from 'react';

function getDays(locale) {
  const currentLocale = moment.locale();
  moment.locale(locale);
  const days = moment.weekdaysShort();
  moment.locale(currentLocale);
  return days;
}

function WeekDays({getI18nText}) {
  return (
    <ul className='weekDays'>
      {getDays(getI18nText('locale')).map((day, index) => <li key={index}>{day}</li>)}
    </ul>
  );
}
WeekDays.propTypes = {
  getI18nText: React.PropTypes.func.isRequired
};

export default WeekDays;
