import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addMonths } from 'date-fns';

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
            if (!inputElement.childNodes[1].contains(e.target)) setOpen(true);
         }
         if (open && !pickerElement.contains(e.target)) {
            setOpen(false);
            setCurrentMonth(selectedDate || new Date());
         }
      };
      document.addEventListener('click', openCloseDatePicker);
      return () => document.removeEventListener('click', openCloseDatePicker);
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

   // Clear selected
   const clearSelected = () => { setCurrentMonth(new Date()); setSelectedDate(undefined); };

   const updateMonth = modifier => setCurrentMonth(addMonths(currentMonth, modifier));

   const updateSelected = newSelected => { setSelectedDate(newSelected); setCurrentMonth(newSelected); };

   // Render the date-picker or the input field
   return (
      <>
         <InputField id={id} selected={selectedDate} clearSelected={clearSelected} />
         {open && ReactDOM.createPortal((
            <DatePicker id={id} selected={selectedDate} month={currentMonth} updateSelected={updateSelected} updateMonth={updateMonth} locale={locale} />
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
