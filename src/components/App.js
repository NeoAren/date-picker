import React from 'react';

import DatePicker from './DatePicker';

const App = () => {

   return (
      <div id="test">
         <span>Start date:</span>
         <DatePicker id="picker1" lang="en" selected={1001800800000} />
         <span>End date:</span>
         <DatePicker id="picker2" lang="en" selected={new Date()} />
      </div>
   );

};

export default App;
