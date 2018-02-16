import React, {Component} from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';

const Errors = props=>(
    <ul>
    {
        props.errors.map((error, index)=>(
            <li key={index}>{error}</li>
        ))
    }
    </ul>
)

class Register extends Component{
    
    constructor (props) {
        super (props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {login: false}

    }

    showLogin = (props) => {
         this.setState({login: true})
     }

handleSubmit = (event) => {
    event.preventDefault();
    const { password, c_password} = event.target;

    if(password.value !== c_password.value){
        notify.show("Passwords don't match", "error", 4000)
        return;
    }
    
    axios.post(`/auth/register`, {
        'first_name': event.target.first_name.value,
        'last_name': event.target.last_name.value,
        'email'    : event.target.email.value,
        'password': event.target.password.value
        })
        .then((response) =>{
            console.log(response);
            notify.show(response.data.message, "error", 4000)
        this.props.history.push("/login")   
        })
        .catch(function (error) {
        if(error.response){
            const { data:{message} } = error.response;
            console.log(message)
            notify.show(<Errors errors={message} />, 'error', 4000)
        }
        });      
    }

render(){
    return (   
    <div>   
        <div className="container">
            <div className="login">
                <div className=" login-screen">
                    <h2 className="text-capitalize card-title mt-5">Register</h2>
                    <div className=" login-form">
                        <form method="POST" name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                    <div className="row signupForm">
                        <div className="col">

                            <div className="control-group">
                                <label className="control-label">Firstname</label>
                                <div className="col">
                                    <input type="text" className="form-input form-control" name="first_name" required/>
                                </div>
                            </div>
       
                            <div className="control-group">
                                <label className="control-label">Lastname</label>
                                <div className="col">
                                     <input type="text" className="form-input form-control" name="last_name" required/>
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
                                    <input type="password" className="form-input form-control" name="password" required minLength="8"/>
                                </div>
                            </div>

                            <div className="control-group">
                                <label className="control-label align-content-around" htmlFor="password">Confirm Password</label>
                                <div className="col">
                                    <input type="password" className="form-input form-control" name="c_password" required minLength="8"/>
                                </div>
                           </div>
                            <button type='submit' className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    }
};

export default Register;