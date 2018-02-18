import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {notify} from 'react-notify-toast';

class Login extends Component{
    constructor(props){
        super(props)
        
              this.state = {
                  email:'',
                  password:''
              };
       }

 //handle submit for login with axios post
handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/auth/login`, {
        email: this.state.email,
        password: this.state.password
        })
        .then( (response) =>{
            // console.log(response);
            // console.log(response.data.token)
            localStorage.setItem("TK", response.data.token)
            this.props.history.push("/list")
            notify.show(response.data.message, 'success', 500)
            this.setState({
                email:"",
                password:"",
            })
            
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
        
}

handleChange = (event)=>{
    const { value,name} = event.target;
    this.setState({
       [name]: value,
    })
}

render(){
        
return(
    <div className="login">
        <div className="login-screen">
            <div className="app-title">
                <h1>Login</h1>
            </div>
            
            <div className="login-form">
                <form method="POST" id="login_form" name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                <div className="control-group">
                    <input type="text" className="login-field"  placeholder="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                    <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                </div>

                <div className="control-group">
                    <input type="password" className="login-field"  placeholder="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}required/>
                    <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                </div>
        
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>
        
                <Link to="/register"> Register new Account</Link>
          
            </div>
                        
         </div>
    </div>
    );
    }
}


export default Login;