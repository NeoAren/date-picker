import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Calendar from './Calendar';

const App = () => {

   return (
      <div id="calendar-test">
         <Calendar id="my-calendar" lang="en" size="s" />
      </div>
   );

};

export default App;
