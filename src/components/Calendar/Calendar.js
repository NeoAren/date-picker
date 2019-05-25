import React, { useState } from "react";
import PropTypes from 'prop-types';
import dateFns from "date-fns";

import './Calendar.scss';
import loadLocaleFile from './loadLocaleFile';

const Calendar = ({ id, selected, size, lang }) => {

   // Load the locale file
   const locale = { locale: loadLocaleFile(lang) };

   // Save the current month and the selected date in the state
   const [currentMonth, setCurrentMonth] = useState(selected || new Date());
   const [selectedDate, setSelectedDate] = useState(selected || new Date());

   // Change the current month
   const nextMonth = () => setCurrentMonth(dateFns.addMonths(currentMonth, 1));
   const prevMonth = () => setCurrentMonth(dateFns.subMonths(currentMonth, 1));

   // Render the header
   const renderHeader = () => {
      return (
         <div className={'calendar-header calendar-header--' + size}>
            <div className="calendar-header--prev" onClick={prevMonth}>
               <div className="icon">chevron_left</div>
            </div>
            <div className="calendar-header--month">
               <span>{dateFns.format(currentMonth, 'MMMM YYYY', locale)}</span>
            </div>
            <div className="calendar-header--next" onClick={nextMonth}>
               <div className="icon">chevron_right</div>
            </div>
         </div>
      );
   };

   // Render the daylist
   const renderDaylist = () => {
      const days = [];
      const startDate = dateFns.startOfWeek(currentMonth, { weekStartsOn: 1 });
      for (let i = 0; i < 7; i++) {
         days.push(
            <div className="calendar-daylist--day" key={i}>{dateFns.format(dateFns.addDays(startDate, i), 'dd', locale)}</div>
         );
      }
      return <div className={'calendar-daylist calendar-daylist--' + size}>{days}</div>;
   };

   // Render the body
   const renderBody = () => {
      const monthStart = dateFns.startOfMonth(currentMonth);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
      const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });

      let daysInMonth = [];
      let day = startDate;

      // Loop through the displayed days
      while (day <= endDate) {
         const currentDay = dateFns.parse(day);

         // height = (width - border - padding - gap) / 7
         const style = { height: ({ s: 158, m: 300, l: 400, xl: 500 }[size]) / 7 };
         let className = 'calendar-body--day';
         className += !dateFns.isSameMonth(day, monthStart) ? ' disabled' : '';
         className += dateFns.isSameDay(day, selectedDate) ? ' selected' : '';
         className += dateFns.isSameDay(day, new Date()) ? ' today' : '';
         daysInMonth.push(
            <div className={className} style={style} key={day} onClick={() => setSelectedDate(currentDay)}>
               {dateFns.format(day, 'D')}
            </div>
         );
         day = dateFns.addDays(day, 1);
      }

      return <div className={'calendar-body calendar-body--' + size}>{daysInMonth}</div>;
   };

   // Render Calendar component
   return (
      <div className={'calendar calendar--' + size}>
         {renderHeader()}
         {renderDaylist()}
         {renderBody()}
      </div>
   );

};

Calendar.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   selectedDate: PropTypes.number,
   size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
   lang: PropTypes.string
};

Calendar.defaultProps = {
   size: 'm',
   lang: 'en'
};

export default Calendar;
