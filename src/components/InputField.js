import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './styles/InputField.scss';

import { Calendar as CalendarIcon, Close as CloseIcon } from '../icons';

const InputField = ({ id, selected, reset, placeholder }) => {

   // Set formatted date and base classname
   const date = !selected ? '' : format(selected, 'YYYY-MM-DD');
   const className = 'neodatepicker-input';

   // Render 'InputField' component
   return (
      <div id={id + '-input'} className={className}>
         <input readOnly className={className + '__field'} value={date} placeholder={placeholder} />
         <i className={className + '__close-icon'} onClick={reset}><CloseIcon /></i>
         <i className={className + '__calendar-icon'}><CalendarIcon /></i>
      </div>
   );

};

InputField.propTypes = {
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   selected: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]),
   reset: PropTypes.func.isRequired,
   placeholder: PropTypes.string
};

export default InputField;
