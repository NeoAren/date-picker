import React, { useState } from "react";
import PropTypes from 'prop-types';
import dateFns from "date-fns";

import './DatePicker.scss';
import loadLocaleFile from './loadLocaleFile';
import { Calendar, Close, ChevronLeft, ChevronRight } from './icons';

const DatePicker = ({ id, selected, lang }) => {

   // Load the locale file
   const locale = { locale: loadLocaleFile(lang) };

   // Save 'open' or 'close' state of the date picker
   const [open, setOpen] = useState(false);

   // Save the current month and the selected date in the state
   const [currentMonth, setCurrentMonth] = useState(selected || new Date());
   const [selectedDate, setSelectedDate] = useState(selected || undefined);

   // Change the current month
   const nextMonth = () => setCurrentMonth(dateFns.addMonths(currentMonth, 1));
   const prevMonth = () => setCurrentMonth(dateFns.subMonths(currentMonth, 1));

   // Render date-picker input field
   const renderInputField = () => {
      const formattedDate = selectedDate && dateFns.format(selectedDate, 'YYYY-MM-DD');
      const clear = () => setSelectedDate(undefined);
      return (
         <div className={'date-picker-input' + (selectedDate ? ' date-picker-input--selected' : '')}>
            <input readOnly className="date-picker-input__field" value={formattedDate || ''} placeholder="Select date" />
            <i className="date-picker-input__calendar-icon"><Calendar /></i>
            {selectedDate && <i className="date-picker-input__close-icon" onClick={clear}><Close /></i>}
         </div>
      );
   };

   // Render the header
   const renderHeader = () => {
      return (
         <div className="date-picker-container__header">
            <div className="date-picker-container__header-prev" onClick={prevMonth}>
               <ChevronLeft />
            </div>
            <div className="date-picker-container__header-month">
               <span>{dateFns.format(currentMonth, 'MMMM YYYY', locale)}</span>
            </div>
            <div className="date-picker-container__header-next" onClick={nextMonth}>
               <ChevronRight />
            </div>
         </div>
      );
   };

   // Render the body
   const renderBody = () => {
      const monthStart = dateFns.startOfMonth(currentMonth);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
      const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });

      let daysInMonth = [];
      let day = startDate;

      // Loop through the days of the week
      const startOfWeek = dateFns.startOfWeek(currentMonth, { weekStartsOn: 1 });
      for (let i = 0; i < 7; i++) {
         daysInMonth.push(
            <div className="date-picker-container__body-day date-picker--daylist" key={i}>
               {dateFns.format(dateFns.addDays(startOfWeek, i), 'dd', locale)}
            </div>
         );
      }

      // Loop through the displayed days
      while (day <= endDate) {
         const currentDay = dateFns.parse(day);
         let className = 'date-picker-container__body-day';
         className += !dateFns.isSameMonth(day, monthStart) ? ' date-picker--disabled' : '';
         className += dateFns.isSameDay(day, selectedDate) ? ' date-picker--selected' : '';
         className += dateFns.isSameDay(day, new Date()) ? ' date-picker--today' : '';
         daysInMonth.push(
            <div className={className} key={day} onClick={() => setSelectedDate(currentDay)}>
               {dateFns.format(day, 'D')}
            </div>
         );
         day = dateFns.addDays(day, 1);
      }

      return <div className="date-picker-container__body">{daysInMonth}</div>;
   };

   // Render DatePicker component
   return (
      <div id={id} className="date-picker">
         {renderInputField()}
         <div className="date-picker-container" style={{ display: 'none' }}>
            <div className="date-picker-container__input-wrapper">
               <input className="date-picker-container__input" placeholder="Select date" />
            </div>
            <div className="date-picker-container__picker">
               {renderHeader()}
               {renderBody()}
            </div>
         </div>
      </div>
   );

};

DatePicker.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   selected: PropTypes.number,
   lang: PropTypes.string
};

DatePicker.defaultProps = {
   lang: 'en'
};

export default DatePicker;
