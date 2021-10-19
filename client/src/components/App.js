import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Import components
import Header from './Header.js';
import Courses from './Courses.js';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse.js';
import UpdateCourse from './UpdateCourse';
import DeleteCourse from './DeleteCourse';
import UserSignIn from './UserSignIn';
import SignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import PrivateRoute from '../PrivateRoute';
import NotFound from './NotFound';
import Error from './Error';
import Forbidden from './Forbidden';

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path= "/" component={Courses} />
            <PrivateRoute path= "/courses/create" component={CreateCourse}/>
            <PrivateRoute path= "/courses/:id/update" component={UpdateCourse} />
            <PrivateRoute path= "/courses/:id/delete" component={DeleteCourse} />
            <Route path= "/courses/:id" component={CourseDetail} />
            <Route path= "/signin" component={UserSignIn} />
            <Route path= "/signup" component={SignUp} />
            <Route path= "/signout" component={UserSignOut} />
            <Route path= "/notfound" component={NotFound} />
            <Route path= "/forbidden" component={Forbidden} />
            <Route path= "/error" component={Error} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  } 
}

export default App;
