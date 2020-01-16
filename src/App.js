import React, {Component} from 'react';

import AppRouter from './routage/AppRouter';
import NavBar from './components/Layout/NavBar/NavBar';


class App extends Component {

	render() {
	
		return (
		    <div>
			<AppRouter/>
           </div>	
		);
	}
}
export default App;
