# Work in Progress notice
This package is currently undergoing development. Due to the frequent changes in the basic features and project structure, breaking changes might be introduced on a regular basis. Semantic versioning will also not be used until it's release. Please do not use this package yet.

# Neo Date Picker

[![NPM](https://img.shields.io/npm/v/@neoaren/date-picker.svg)](https://www.npmjs.com/package/@neoaren/date-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> 📅 A modern and easy-to-use React date-picker component

## Install

```bash
npm install @neoaren/date-picker
```

## Usage

```jsx
import React from 'react';

import DatePicker from '@neoaren/date-picker';

const App = () => {

	const handler = date => console.log(date);

	return (
		<DatePicker id="my-datepicker" defaultValue={new Date()} onChange={handler} />
	);

};
```

## License

MIT © [NeoAren](https://github.com/NeoAren)
