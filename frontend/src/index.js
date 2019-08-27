import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { Router } from '@reach/router';

let routes = (
	<Router>
		<App path="/" />
	</Router>
);

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.unregister();
