// Import Modules
import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// Sign Out Component
const SignOut = () => {
    
    // Data from Context
    const context = useContext(contextAPI);

    // Calling the SingOut action from Context
    useEffect(() => context.actions.signOut(), [context.actions]);

    //Redirecting to the Home '/' Page
    return <Redirect to="/" />
}

export default SignOut;