import React from 'react';

import './App.scss';

import DatePicker from './DatePicker';

const App = () => {

   return (
      <div id="app">
         <span>Start date:</span>
         <DatePicker id="picker-1" defaultValue={1001800800000} placeholder="Select date" />
         <span>End date:</span>
         <DatePicker id="picker-2" defaultValue={new Date()} placeholder="Select date" />
      </div>
   );

};

export default App;
