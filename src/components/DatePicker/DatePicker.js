import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import dateFns from "date-fns";

import './DatePicker.scss';
import Wrapper from './Wrapper';
import loadLocaleFile from './loadLocaleFile';
import { Calendar, Close, ChevronLeft, ChevronRight } from './icons';

const DatePicker = ({ id, selected, lang }) => {

   // Load the locale file
   const locale = { locale: loadLocaleFile(lang) };

   // Save the current month and the selected date (+ref) in the state
   const [currentMonth, setCurrentMonth] = useState(selected || new Date());
   const [selectedDate, setSelectedDate] = useState(selected || undefined);
   const selectedDateRef = useRef(selectedDate);

   // Update reference when 'selectedDate' changes
   useEffect(() => {
      selectedDateRef.current = selectedDate;
   }, [selectedDate]);

   // Render the header
   const renderHeader = () => {
      const prevMonth = () => setCurrentMonth(dateFns.subMonths(currentMonth, 1));
      const nextMonth = () => setCurrentMonth(dateFns.addMonths(currentMonth, 1));
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
      const dateStart = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
      const dateEnd = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });

      let daysInMonth = [];
      let day = dateStart;

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
      while (day <= dateEnd) {
         const currentDay = dateFns.parse(day);
         let className = 'date-picker-container__body-day';
         className += !dateFns.isSameMonth(day, monthStart) ? ' date-picker--disabled' : '';
         className += dateFns.isSameDay(day, selectedDate) ? ' date-picker--selected' : '';
         className += dateFns.isSameDay(day, new Date()) ? ' date-picker--today' : '';
         const select = () => { setSelectedDate(currentDay); setCurrentMonth(currentDay); };
         daysInMonth.push(
            <div className={className} key={day} onClick={select}>
               {dateFns.format(day, 'D')}
            </div>
         );
         day = dateFns.addDays(day, 1);
      }

      return <div className="date-picker-container__body">{daysInMonth}</div>;
   };

   // Render date-picker container
   const renderDatePicker = () => {
      const inputElement = document.querySelector('#' + id + '-input');
      const style = inputElement && { top: inputElement.offsetTop, left: inputElement.offsetLeft };
      const formattedDate = !selectedDate ? '' : dateFns.format(selectedDate, 'YYYY-MM-DD');
      const className = 'date-picker-container';
      return (
         <div id={id + '-container'} className={className} style={style}>
            <div className={className + '__input-wrapper'}>
               <input className={className + '__input'} autoFocus={true} defaultValue={formattedDate} placeholder="Select date" />
            </div>
            {renderHeader()}
            {renderBody()}
         </div>
      );
   };

   // Render date-picker input field
   const renderInputField = () => {
      const formattedDate = !selectedDate ? '' : dateFns.format(selectedDate, 'YYYY-MM-DD');
      const clear = () => { setCurrentMonth(new Date()); setSelectedDate(undefined); };
      const className = 'date-picker-input';
      return (
         <div id={id + '-input'} className={className}>
            <input readOnly className={className + '__field'} value={formattedDate} placeholder="Select date" />
            <i className={className + '__close-icon'} onClick={clear}><Close /></i>
            <i className={className + '__calendar-icon'}><Calendar /></i>
         </div>
      );
   };

   // Set the current month to the month of the selected date
   const close = () => setCurrentMonth(selectedDateRef.current);

   // Render the date-picker
   return <Wrapper id={id} inputField={renderInputField} datePicker={renderDatePicker} close={close} />;

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
