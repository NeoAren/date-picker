# Date Picker

[![NPM](https://img.shields.io/npm/v/@neoaren/date-picker.svg)](https://www.npmjs.com/package/@neoaren/date-picker) [![NPM Minzipped size](https://img.shields.io/bundlephobia/minzip/@neoaren/date-picker.svg)](https://www.npmjs.com/package/@neoaren/date-picker) [![NPM Download Week](https://img.shields.io/npm/dw/@neoaren/date-picker.svg)](https://www.npmjs.com/package/@neoaren/date-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![NPM License](https://img.shields.io/npm/l/@neoaren/date-picker.svg)](https://www.npmjs.com/package/@neoaren/date-picker)

> 📅 A modern and easy-to-use React date picker component

## Install
Install the date picker
```bash
npm install --save @neoaren/date-picker
```

### Peer dependencies
This component uses React `>=16.8.0` and React DOM `>=16.8.0` as peer dependencies.

Install them using [npm](https://www.npmjs.com/)
```bash
npm install --save react react-dom
```

## Usage

```jsx
import React from 'react';
import DatePicker from '@neoaren/date-picker';

const App = () => {

  return (
    <DatePicker id="my-datepicker" />
  );

};
```

## Component API

| Name         	|       Type      	| Required 	| Description                                                                                                            	|
|--------------	|:---------------:	|:--------:	|------------------------------------------------------------------------------------------------------------------------	|
| id           	|     `String`    	|  `true`  	| The unique identifier of the date picker element.                                                                      	|
| defaultValue 	| `Number` `Date` 	|  `false` 	| The default value of the date picker.                                                                                  	|
| onChange     	|    `Function`   	|  `false` 	| This function runs when the selected date changes. The new date passed as the only parameter is an instance of `Date`. 	|
| placeholder  	|     `String`    	|  `false` 	| The text to be displayed when no date is selected.                                                                     	|
| lang         	|     `String`    	|  `false` 	| Set the language of the date picker, the default is English. Use the ISO 8601-1 format (e.g. `"en"`)                   	|

## License

MIT © [NeoAren](https://github.com/NeoAren)
