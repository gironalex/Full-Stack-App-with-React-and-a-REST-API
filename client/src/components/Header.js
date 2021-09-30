// Import modules
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { contextAPI } from '../Context.js';

// Header Component - Renders header on all pages
const Header = () => {

  // Data from Context
  const context = useContext(contextAPI);
  const authedUser = context.authedUser;

  return (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            <nav>
                { authedUser ? (               
                
                /* If the user has been authenticated, show a welcome message + signout button link*/
                <React.Fragment>
                  <span>Welcome, {authedUser.name}! </span>
                  <Link className="signout" to="/signout">Sign Out</Link>
                </React.Fragment>
                )
                :
                (
                /* If the user has NOT been authenticated, show a sign up and sign in button links */
                <React.Fragment>
                  <ul className="header--signedout">
                    <Link classname="singup" to="/signup"> Sign Up </Link>
                    <Link classname="singin" to="/signin"> Sign In </Link>
                  </ul>
                </React.Fragment>  
                )
                }
            </nav>
        </div>
    </header>
  )

}

export default Header;