import React, {Component} from 'react';
//import { reduxForm } from 'redux-form';
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Login  from './login'

class Register extends Component{


    constructor (props) {
        super (props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {login: false}

    }

    showLogin = (props) => {
        // this.props.history.push("/register")
         this.setState({login: true})
     }

    handleSubmit = (event) => {
        event.preventDefault();
       
        axios.post('http://localhost:5000/auth/register', {
            'first_name': event.target.first_name.value,
            'last_name': event.target.last_name.value,
            'email'    : event.target.email.value,
            'password': event.target.password.value
          })
          .then( (response) =>{
              console.log(response);
            this.props.history.push("/login")
              
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    render(){
        return (   
           
            <div>
            
            <div className="container">
                <div className="login">
        
                <div className=" login-form">
                    <h2 className="text-capitalize card-title mt-5">Register</h2>
                  <form method="POST" name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                    <div className="row signupForm">
                        <div className="col">
        
                        
                            <div className="control-group">
                                <label className="control-label">Firstname</label>
                                <div className="col">
                                    <input type="text" className="form-input form-control" name="first_name"/>
                                </div>
                            </div>
        
                              
                            <div className="control-group">
                                <label className="control-label">Lastname</label>
                                <div className="col">
                                     <input type="text" className="form-input form-control" name="last_name"/>
                                </div>
                            </div>
        
                          
                            <div className="control-group">
                                <label className="control-label align-content-around" htmlFor="email">Email</label>
                                <div className="col">
                                    <input type="email" className="form-control" name="email" required/>
                                </div>
                            </div>
        
                           
                            <div className="control-group">
                                <label className="control-label align-content-around" htmlFor="password">Password</label>
                                <div className="col">
                                    <input type="password" className="form-input form-control" name="password" />
                                </div>
                            </div>
        
                            <button type='submit'>Submit</button>
                        </div>
                    </div>
                   </form>
                </div>
            </div>
        
        </div>

        </div>
        );

    }
};

export default Register;