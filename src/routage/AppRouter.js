import React, {Component} from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { getCookie } from '../utils/Cookie';
// import ExtBrowserRouter from './ExtBrowserRouter'; 
const authentication = () =>
	getCookie('APPCARBU_COOKIE') 
	? (
		// <Redirect to="/app" />
		<PrivateRoutes/>
	) : (
		<PublicRoutes />
	);

class AppRouter extends Component {
	render() {
		return (
			<div
			  style={style}
			>
						<BrowserRouter>	
							<Switch>	
								<Route path="/app" component={authentication} />
								<Route  render={authentication} />
							</Switch>
						</BrowserRouter>		
           </div>
			
		);
	}
}
const style={
    marginTop:'0px'
}
export default AppRouter;
