import React from 'react';
import logo from './logo.svg';
import './App.css';
import { navigate } from "@reach/router"
import FileUpload from '../fileUpload/fileUpload';

class App extends React.Component {

	render () {
	  return (
	    <div className="App">
				<FileUpload />
	    </div>
	  );
	}
}

export default App;
