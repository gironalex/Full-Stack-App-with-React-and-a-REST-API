import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// Import components
import Header from './Header.js';
import Courses from './Courses.js';

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Courses} />
          
          </Switch>
        </div>
      </Router>
    );
  } 
}

export default App;
