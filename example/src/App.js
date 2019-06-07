import React from 'react';
import DatePicker from 'neo-date-picker';
import './App.css';

const App = () => {

	return (
		<div id="neo-date-picker-demo">
			<span>Start date:</span>
			<DatePicker
				id="demo-1"
				onChange={value => console.log(value)}
				defaultValue={1001800800000}
				placeholder="Select date"
			/>
			<span>End date:</span>
			<DatePicker
				id="demo-2"
				onChange={value => console.log(value)}
				defaultValue={new Date()}
				placeholder="Select date"
			/>
		</div>
	);
};

export default App;
