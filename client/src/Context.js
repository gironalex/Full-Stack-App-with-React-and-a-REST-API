 // Import Modules
 import React, { Component } from 'react';
 import Cookies from 'js-cookie';

 // Import API request file
 import Data from './Data';

 // Creating context instance
 const Context = React.createContext();

 export default class Provider extends Component {

    constructor () {
      super();
      this.data = new Data();
      this.cookie = Cookies.get('authedUser');
      this.state = {
          authedUser: this.cookie ? JSON.parse(this.cookie) : null
      };
    }

    render () {
      const { authedUser } = this.state;
      const value = {
          authedUser,
          data: this.data,
          actions: {
              signIn: this.signIn,
              signOut: this.signOut,
          }
      }

      return (
        <Context.Provider value = {value}>
            {this.props.children}
        </Context.Provider>
      );
    }

    // authenticates current user, persists credentials in global state, and sets cookies
    signIn = async (emailAddress, password) => {
      const user = await this.data.getUser(emailAddress, password);

      if (user !== null) {
        this.setState(() => {
            return {authedUser: user}
        })

        // Setting cookie
        Cookies.set('authedUser', JSON.stringify(user), {expires: 1})
      }

      return user
    }

    // Removes authenticated user and password from the global state
    signOut = () => {
      this.setState({authedUser: null})

      // Removing cookie
      Cookies.remove('authedUser');
    }

}

export const Consumer = Context.Consumer;