import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "bootstrap/dist/js/bootstrap.js";
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
// registerServiceWorker();
