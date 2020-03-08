import React, { Component } from 'react';
import { connect } from 'react-redux';  //for connection to redux store

import { authUser, logout } from '../store/actions';

class Auth extends Component {
    constructor(props) {
        super(props);   //inherits all the props(must be the first line)
        this.state = {
          username: '',
          password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }); //value is what you type and name is referrring to the input we are using 
      }
    
      handleSubmit(e) {
        const { username, password } = this.state;
        const { authType } = this.props;
        e.preventDefault(); //to prevent form from submitting due to the default submit aciton of the html(it refreshes the page)
        this.props.authUser(authType || 'login', { username, password });   //from the auth.js file in actions 1st parameter is path and 2nd is data
      }
      
      render() {
          const { username, password } = this.state;    //destucturing the username and password from this.state
          
          return (
          <div>
            <form className="form" onSubmit={this.handleSubmit}>
              <label className="form-label" for="username">
                username{' '}
              </label>
              <input
                type="text"
                value={username}
                name="username"
                onChange={this.handleChange}
                autoComplete="off"
                className="form-input"
              />
              <label className="form-label" for="password">
                password{' '}
              </label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={this.handleChange}
                autoComplete="off"
                className="form-input"
              />
              <div className="buttons_center">
                <button className="button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>)
      }
}


export default connect(() => ({}), {authUser, logout})(Auth); 
//first parameter is mapping our store to the props, 2nd parameter is mapping our dispatches to the props