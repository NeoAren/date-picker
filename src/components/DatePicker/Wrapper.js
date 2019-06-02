import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { addMonths, format, parse } from 'date-fns';

import './Wrapper.scss';

import InputField from './InputField';
import DatePicker from './DatePicker';
import loadLocaleFile from './loadLocaleFile';

const Wrapper = ({ id, defaultValue, lang, placeholder }) => {

   // Save the state of the picker, the selected date and the current month
   const [open, setOpen] = useState(false);
   const [month, setMonth] = useState(defaultValue || new Date());
   const [selected, setSelected] = useState(defaultValue || undefined);

   // Create getNode function
   const getNode = node => document.querySelector(node);

   // Load the locale file
   const locale = { locale: loadLocaleFile(lang) };

   // Update the current month
   const updateMonth = modifier => setMonth(addMonths(month, modifier));

   // Select a new date, update selected and month, close picker
   const select = date => {
      setMonth(date || new Date());
      setSelected(date);
      setOpen(false);
   };

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
         if (open && !pickerElement.contains(e.target)) select(selected);
      };
      document.addEventListener('click', openCloseDatePicker);
      return () => document.removeEventListener('click', openCloseDatePicker);
   });

   // Close the picker when the window is resized
   useEffect(() => {
      window.onresize = () => open && select(selected);
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
            select(parse(value));
         }
      };
      document.addEventListener('keyup', validateInput);
      return () => document.removeEventListener('keyup', validateInput);
   });

   // Render the date-picker or the input field
   return (
      <>
         <InputField
            id={id}
            selected={selected}
            reset={() => select(undefined)}
            placeholder={placeholder}
         />
         {open && ReactDOM.createPortal((
            <DatePicker
               id={id}
               month={month}
               select={select}
               selected={selected}
               updateMonth={updateMonth}
               locale={locale}
            />
         ), getNode('#neodatepicker-container'))}
      </>
   );

};

Wrapper.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
   lang: PropTypes.string,
   placeholder: PropTypes.string
};

Wrapper.defaultProps = {
   lang: 'en'
};

export default Wrapper;
