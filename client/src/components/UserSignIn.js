// Import Modules
import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { contextAPI } from '../Context.js';

// Sign Component 
const UserSignIn = () => {
    
    // Setting State
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // Data from Context
    const context = useContext(contextAPI);

    // URL History
    const history = useHistory();
    //const {from} = history.location.state || {from: {pathname: '/'}};
    
    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Ensuring input fields have been properly filled
        if (!emailAddress && !password) {
            setErrors('Please type a valid email address & password');
        } else if (!emailAddress) {
            setErrors('Please type a valid email address');
        } else if (!password) {
            setErrors('Please type a password')
        } else {
            //Signing in after input test validation
            context.actions.signIn(emailAddress, password)
              .then(res => {
                if (res === null) {
                  setErrors('Sign-In was unsuccessful, double check your email and password inputs or create an account!');
                } else {
                    history.goBack();
                    console.log(`Success! ${emailAddress} is now signed in.`);
                }   
              })
              .catch((err) => {
                  history.push('/error');
                  console.log(err);
              })
        }
    }

    // Handle Cancel Button
    const handleCancel = (e) => {
        e.preventDefault();
        history.push('/');
    }

    return (
      <main>
        <div className="form--centered">
        <h2>Sign In</h2>
            { 
              errors.length ? 
                <div className="validation--errors">
                  <h3>Validation Errors</h3>
                    <ul>
                      <ReactMarkdown>{ errors }</ReactMarkdown>
                    </ul>
                </div>
                : 
                null
            }
            <form onSubmit= { (e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e)=> setEmailAddress(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                <button className="button" type="submit" onClick={handleSubmit}>Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
      </main>
    );
}
        
export default UserSignIn;