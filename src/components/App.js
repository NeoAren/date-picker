import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DatePicker from './DatePicker';

const App = () => {

   // <DatePicker id="picker1" lang="en" />
   // <br /><br />

   return (
      <div id="calendar-test">

         <DatePicker id="picker2" lang="en" selected={1001800800000} />
      </div>
   );

};

export default App;
