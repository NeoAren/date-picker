import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addMonths, format, parse } from 'date-fns';

import './Wrapper.scss';

import InputField from './InputField';
import DatePicker from './DatePicker';
import loadLocaleFile from './loadLocaleFile';

const Wrapper = ({ id, selected, lang }) => {

   // Load the locale file
   const locale = { locale: loadLocaleFile(lang) };

   // State of the picker
   const [open, setOpen] = useState(false);

   // Save the selected date and the current month in the state
   const [selectedDate, setSelectedDate] = useState(selected || undefined);
   const [currentMonth, setCurrentMonth] = useState(selected || new Date());

   // Create getNode function
   const getNode = node => document.querySelector(node);

   // Open or close the picker
   useEffect(() => {
      const openCloseDatePicker = e => {
         const inputElement = getNode('#' + id + '-input');
         const pickerElement = getNode('#' + id + '-picker');
         if (!open && inputElement.contains(e.target)) {
            if (window.getSelection().toString() !== '') return;
            if (!inputElement.childNodes[1].contains(e.target)) setOpen(true);
         }
         if (open && typeof e.target.className === 'string') {
            if (e.target.className.includes('neodatepicker-picker__body-item')) return;
         }
         if (open && !pickerElement.contains(e.target)) {
            setOpen(false);
            setCurrentMonth(selectedDate || new Date());
         }
      };
      document.addEventListener('mouseup', openCloseDatePicker);
      return () => document.removeEventListener('mouseup', openCloseDatePicker);
   });

   // Close the picker when the window is resized
   useEffect(() => {
      window.onresize = () => {
         if (!open) return;
         setOpen(false);
         setCurrentMonth(selectedDate || new Date());
      };
   });

   // Add container element if it doesn't exist
   useEffect(() => {
      if (getNode('#neodatepicker-container')) return;
      const containerElement = document.createElement('div');
      containerElement.setAttribute('id', 'neodatepicker-container');
      getNode('body').appendChild(containerElement);
   }, []);

   // Validate input in picker__input
   useEffect(() => {
      const validateInput = e => {
         const input = getNode('.neodatepicker-picker__input');
         const picker = getNode('#' + id + '-picker');
         if (!open || !picker || !input || e.key !== 'Enter' || !picker.contains(e.target)) return;
         const value = input.value;
         if (value.match(/^(\d{4})-(\d{2})-(\d{2})$/) && value === format(parse(value), 'YYYY-MM-DD')) {
            setSelectedDate(parse(value));
            setCurrentMonth(parse(value));
            setOpen(false);
         }
      };
      document.addEventListener('keyup', validateInput);
      return () => document.removeEventListener('keyup', validateInput);
   });

   // Functions passed down to InputField and DatePicker
   const clearSelected = () => { setCurrentMonth(new Date()); setSelectedDate(undefined); };

   const updateMonth = modifier => setCurrentMonth(addMonths(currentMonth, modifier));

   const updateSelected = updated => { setSelectedDate(updated); setCurrentMonth(updated); setOpen(false); };

   // Render the date-picker or the input field
   return (
      <>
         <InputField id={id} selected={selectedDate} clearSelected={clearSelected} />
         {open && ReactDOM.createPortal((
            <DatePicker
               id={id}
               selected={selectedDate}
               month={currentMonth}
               updateSelected={updateSelected}
               updateMonth={updateMonth}
               locale={locale}
            />
         ), getNode('#neodatepicker-container'))}
      </>
   );

};

Wrapper.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   selected: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
   lang: PropTypes.string
};

Wrapper.defaultProps = {
   lang: 'en'
};

export default Wrapper;
