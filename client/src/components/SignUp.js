// Import Modules
import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// SignUp Component
const SignUp = () => {

    // Setting State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // Data from Context
    const context = useContext(contextAPI);

    // URL History
    const history = useHistory();
    const {from} = history.location.state || {from: {pathname: '/'}};
    
    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Data to be passed to the database
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        // Posting user data to the database
        context.data.createUser(user)
          .then( (errors) => {
            if (errors.length) {
                setErrors(errors);
            } else {
                // Sign in the new user
                console.log(`${emailAddress} has successfully signed up`);
                context.actions.signIn(emailAddress, password)
                    .then( () => {
                    history.push(from); 
                   })
            }                      
        })
        .catch((err) => {
            history.push('/error');
            console.log('Error with Signing Up', err);
        }); 
    }

    // Handle Cancel Button
    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
      <main>
        <div className="form--centered">
            <h2>Sign Up </h2>
            { 
              errors.length ? 
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, index) => {
                            return (
                              <li key={index}>{error}</li>  
                            )
                        })}
                    </ul>
                </div>
                : 
                null
            }
            <form onSubmit= { (e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)}></input>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)}></input>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e)=> setEmailAddress(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} ></input>
                <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
        </div>
      </main>
    )
}

export default SignUp;