import React, { Component } from 'react';
import Register from './register'
import Header from './header'
import Footer from './footer'
import axios from 'axios';

import {
    BrowserRouter,
    Route,
    Link
  } from 'react-router-dom'

class Login extends Component{
    constructor (props) {
        super (props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
       
        axios.post('http://localhost:5000/auth/login', {
            'email'    : event.target.email.value,
            'password': event.target.password.value
          })
          .then( (response) =>{
              console.log(response);
              console.log(response.data.token)
              localStorage.setItem("TK", response.data.token)

              this.props.history.push("/dashboard")
              
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    render(){
        
            return(
                <div className="login">
                    <div className="login-screen">
                        <div className="app-title">
                            <h1>Login</h1>
                        </div>
            
                        <div className="login-form">
                          <form method="POST"  name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                            <div className="control-group">
                            <input type="text" className="login-field"  placeholder="email" name="email"/>
                            <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                            </div>
            
                            <div className="control-group">
                            <input type="password" className="login-field"  placeholder="password" name="password"/>
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                            </div>
                           <input type="submit" value="submit"/>
                          </form>
                          <Link to="/register"> Register new Account</Link>
                             
                        </div>
                        
                    </div>
                </div>
                );
           
    }
}


export default Login;