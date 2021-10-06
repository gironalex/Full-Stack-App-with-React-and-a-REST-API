import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Import components
import Header from './Header.js';
import Courses from './Courses.js';
import CoursesDetail from './CoursesDetail';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path= "/courses/:id" component={CoursesDetail} />
            <Route path= "/signin" component={SignIn} />
            <Route path= "/signup" component={SignUp} />
            <Route path= "/signout" component={SignOut} />
          </Switch>
        </div>
      </Router>
    );
  } 
}

export default App;
