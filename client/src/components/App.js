import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

// Import components
import Header from './Header.js';

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <Header />

        </div>
      </Router>
    );
  } 
}

export default App;
