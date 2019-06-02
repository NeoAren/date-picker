import React from 'react';

import './App.scss';

import DatePicker from './DatePicker';

const App = () => {

   return (
      <div id="app">
         <span>Start date:</span>
         <DatePicker id="picker1" defaultValue={1001800800000} lang="hu" placeholder="Válasszon dátumot" />
         <span>End date:</span>
         <DatePicker id="picker2" defaultValue={new Date()} lang="de" placeholder="Datum auswählen" />
      </div>
   );

};

export default App;
