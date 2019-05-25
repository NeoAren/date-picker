//
// React Test Bench - Frontend (React), 2019
//

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../components/app_reducer';

import '../scss/style.scss';

import App from '../components/App';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
