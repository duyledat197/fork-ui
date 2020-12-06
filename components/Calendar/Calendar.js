import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button';
import Header from './Header';
import Grid from './Grid';

const Calendar = ({
  now,
  className,
  displayDate,
  startDate,
  endDate,
  onNextMonth,
  onPrevMonth,
  onDateClick,
  onClear,
  onReset,
  onGotoNow,
  hiddenRefresh,
  ...otherProps
}) => {
  return (
    <div className={cn('fui-calendar', className)} {...otherProps}>
      <Header
        displayDate={displayDate}
        onNextMonth={onNextMonth}
        onPrevMonth={onPrevMonth}
        onClear={onClear}
        onReset={onReset}
        onGotoNow={onGotoNow}
        hiddenRefresh={hiddenRefresh}
      />
      <Grid
        displayDate={displayDate}
        onDateClick={onDateClick}
        startDate={startDate}
        endDate={endDate}
        now={now}
      />
    </div>
  );
};

Calendar.defaultProps = {
  now: new Date(Date.now()),
  onNextMonth: f => f,
  onPrevMonth: f => f,
  onDateClick: f => f,
  onClear: f => f,
  onReset: f => f,
  onGotoNow: f => f,
};

export default Calendar;
