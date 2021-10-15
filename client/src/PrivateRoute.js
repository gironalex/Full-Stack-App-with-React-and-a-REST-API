// Import Modules
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { contextAPI } from './Context.js';

// Private Route - HOC used for configuring protected routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  
  // Data from Context
  const context = useContext(contextAPI);

  return (
    <Route 
      {...rest}
      render={props => context.authedUser ? (
                <Component {...props} />
                ) : (
                <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
                }}/>
                )       
              }
    />
  )
}

export default PrivateRoute;