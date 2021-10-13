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
import UpdateCourse from './UpdateCourse';
import DeleteCourse from './DeleteCourse';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
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
            <Route path= "/courses/:id" component={CoursesDetail} />
            <PrivateRoute path= "/courses/:id/update" component={UpdateCourse} />
            <PrivateRoute path= "/courses/:id/delete" component={DeleteCourse} />
            <Route path= "/signin" component={SignIn} />
            <Route path= "/signup" component={SignUp} />
            <Route path= "/signout" component={SignOut} />
            <Route path= "/not-found" component={NotFound} />
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
