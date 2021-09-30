/*************************************************
 Treehouse FSJS TechDegree:
 Project 10 - Full Stack React App with a REST API
**************************************************/

// Import Modules
import React from 'react';
import ReactDOM from 'react-dom';

// Import Styles
import '../src/styles/reset.css';
import '../src/styles/global.css';

// Import Main Component
import App from './components/App';
import Provider from './Context';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

