'use-strict'

/* Dependencies */
const auth = require('basic-auth');
const bcrypt = require('bcrypt');

/* Model Dependencies */ 
const { User, Course } = require('../models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
    
    // store the message to display
    let message; 

    const credentials = auth(req);
  
    if (credentials) {
      const user = await User.findOne({ 
        where: {
            emailAddress: credentials.name,
        },
      });
      if (user) {
        const authenticated = bcrypt.compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for username: ${user.emailAddress}`);
  
          // Store the user on the Request object.
          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for username: ${credentials.emailAddress}`;
      }
    } else {
      message = 'Authentication header not found';
    }
  
    if (message) {
      console.warn(message);
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  }