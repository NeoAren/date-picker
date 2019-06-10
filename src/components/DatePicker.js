import React from 'react';
import PropTypes from 'prop-types';
import { format, parse, addDays, isSameDay, isSameMonth } from 'date-fns';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

import './styles/DatePicker.scss';

import { ChevronLeft, ChevronRight } from '../icons';

const DatePicker = ({ id, selected, select, month, updateMonth, locale }) => {

   // Set the position of the date picker
   const inputElement = document.querySelector('#' + id + '-input');
   const style = inputElement && { top: inputElement.offsetTop, left: inputElement.offsetLeft };

   // Set start and end of the displayed date interval
   const dateStart = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
   const dateEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

   // Set formatted date and base classname
   const date = !selected ? '' : format(selected, 'YYYY-MM-DD');
   const className = 'neodatepicker-picker';

   // Render the body
   const renderBody = () => {

      let daysInMonth = [];
      let day = dateStart;

      // Loop through the days of the week
      for (let i = 0; i < 7; i++) {
         daysInMonth.push(
            <div className={className + '__body-day'} key={i}>
               {format(addDays(day, i), 'dd', locale)}
            </div>
         );
      }

      // Loop through the displayed days
      while (day <= dateEnd) {
         const currentDay = parse(day);
         let dayClassName = className + '__body-item';
         dayClassName += !isSameMonth(day, month) ? ' neodatepicker--disabled' : '';
         dayClassName += isSameDay(day, selected) ? ' neodatepicker--selected' : '';
         dayClassName += isSameDay(day, new Date()) ? ' neodatepicker--today' : '';
         daysInMonth.push(
            <div className={dayClassName} key={day} onClick={e => select(currentDay)}>
               {format(day, 'D')}
            </div>
         );
         day = addDays(day, 1);
      }

      return daysInMonth;
   };

   // Render DatePicker component
   return (
      <div id={id + '-picker'} className={className} style={style}>
         <div className={className + '__input-wrapper'}>
            <input className={className + '__input'} autoFocus={true} defaultValue={date} placeholder="YYYY-MM-DD" />
         </div>
         <div className={className + '__header'}>
            <div className={className + '__header-prev'} onClick={() => updateMonth(-1)}>
               <ChevronLeft />
            </div>
            <div className={className + '__header-month'}>
               <span>{format(month, 'MMMM YYYY', locale)}</span>
            </div>
            <div className={className + '__header-next'} onClick={() => updateMonth(1)}>
               <ChevronRight />
            </div>
         </div>
         <div className={className + '__body'}>{renderBody()}</div>
      </div>
   );

};

DatePicker.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   selected: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
   month: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
   select: PropTypes.func.isRequired,
   updateMonth: PropTypes.func.isRequired,
   locale: PropTypes.object
};

export default DatePicker;
