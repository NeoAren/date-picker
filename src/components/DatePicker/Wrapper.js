import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Wrapper = ({ id, inputField, datePicker, close }) => {

   // State of the date-picker
   const [open, setOpen] = useState(false);

   // Close function
   const closeDatePicker = () => {
      setOpen(false);
      close();
   };

   // Open or close the date-picker
   useEffect(() => {
      const openCloseDatePicker = e => {
         const inputElement = document.querySelector('#' + id + '-input');
         const datePickerElement = document.querySelector('#' + id + '-container');
         if (!open && inputElement.contains(e.target)) {
            if (!inputElement.childNodes[1].contains(e.target)) setOpen(true);
         }
         if (open && !datePickerElement.contains(e.target)) closeDatePicker();
      };
      document.addEventListener('click', openCloseDatePicker);
      return () => document.removeEventListener('click', openCloseDatePicker);
   }, [open]);

   // Close the date-picker when the window is resized
   useEffect(() => {
      window.onresize = () => open && closeDatePicker();
   }, [open]);

   // Add date-picker overlay if it doesn't exist
   useEffect(() => {
      if (document.querySelector('#date-picker-overlay')) return;
      const overlay = document.createElement('div');
      overlay.setAttribute('id', 'date-picker-overlay');
      document.querySelector('body').appendChild(overlay);
   }, []);

   // Render the date-picker or the input field
   return (
      <>
         {inputField()}
         {open && ReactDOM.createPortal(datePicker(), document.querySelector('#date-picker-overlay'))}
      </>
   );

};

Wrapper.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   inputField: PropTypes.func.isRequired,
   datePicker: PropTypes.func.isRequired,
   close: PropTypes.func.isRequired
};

export default Wrapper;
