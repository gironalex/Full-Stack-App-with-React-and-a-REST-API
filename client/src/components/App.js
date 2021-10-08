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
import CreateCourse from './CreateCourse.js';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
import NotFound from './NotFound';
import Error from './Error';

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path= "/courses/:id" component={CoursesDetail} />
            <Route path= "/courses/create" component={CreateCourse}/>
            <Route path= "/signin" component={SignIn} />
            <Route path= "/signup" component={SignUp} />
            <Route path= "/signout" component={SignOut} />
            <Route path= "/error" component={Error} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  } 
}

export default App;
