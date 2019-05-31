import React from 'react';

import DatePicker from './DatePicker';

const App = () => {

   return (
      <div id="test">
         <span>Choose a date:</span>
         <DatePicker id="picker1" lang="en" selected={1001800800000} />
         <span>Choose a date:</span>
         <DatePicker id="picker2" lang="en" selected={1001800800000} />
      </div>
   );

};

export default App;
