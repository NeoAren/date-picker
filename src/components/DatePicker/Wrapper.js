import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Wrapper = ({ id, inputField, datePicker }) => {

   // Save the 'open' state of the player
   const [open, setOpen] = useState(false);

   // Open or close the date-picker
   useEffect(() => {
      const openCloseDatePicker = e => {
         if (!open && e.target.className === 'date-picker-input__field') setOpen(true);
         if (open && !document.querySelector('#' + id).contains(e.target)) setOpen(false);
      };
      document.addEventListener('click', openCloseDatePicker);
      return () => document.removeEventListener('click', openCloseDatePicker);
   }, [open]);

   // Close the date-picker when the window is resized
   useEffect(() => {
      window.onresize = () => open && setOpen(false);
   }, [open]);

   // Add date-picker overlay if it doesn't exist
   useEffect(() => {
      if (document.querySelector('#date-picker-overlay')) return;
      const overlay = document.createElement('div');
      overlay.setAttribute('id', 'date-picker-overlay');
      document.querySelector('body').appendChild(overlay);
   }, []);

   // Render the date-picker or the input field
   if (open) {
      return ReactDOM.createPortal(datePicker, document.querySelector('#date-picker-overlay'));
   } else {
      return inputField;
   }

};

Wrapper.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   inputField: PropTypes.node.isRequired,
   datePicker: PropTypes.node.isRequired
};

export default Wrapper;
