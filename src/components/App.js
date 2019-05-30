import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DatePicker from './DatePicker';

const App = () => {

   return (
      <div id="test">
         <span>Choose a date:</span>
         <DatePicker id="picker" lang="en" selected={1001800800000} />
      </div>
   );

};

export default App;
