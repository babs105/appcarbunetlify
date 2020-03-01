import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { getCookie } from '../utils/Cookie';
import ExtBrowserRouter from './ExtBrowserRouter'; 



const authentication = () =>
	getCookie('APPCARBU_COOKIE') ? (
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
					
						<ExtBrowserRouter>
							<Switch>	
								<Route path="/app" component={authentication} />
								<Route  render={authentication} />
							</Switch>
						</ExtBrowserRouter>		
           </div>
			
		);
	}
}
const style={
    marginTop:'20px'
}
export default AppRouter;
