import React from 'react';
import {render} from 'react-dom';   //instead of ReactDOM importing only render as only that is used. You can use ReactDOM also, then you will have to write ReactDOM.render instead of just render
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
