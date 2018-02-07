import React, {Component} from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import Login from './login'
import Register from './register'

class Header extends Component{
    render(){
        return(
           
            <div>
                <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm " >
                    <div className="container">
                        <h1 className="navbar-brand m-o align-content-end mr-auto">WELCOME TO YOUR SHOPPING LIST</h1>
                        <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <Link to="/search"><i className="fa fa-search" /></Link>
                        </form>
                        <div className="navbar-nav ">
                              <div>
                                <ul>
                                  <Link to="/"><i className="fa fa-home" />  Home   </Link>
                                  { localStorage.getItem("TK") ?
                                  
                                  <Link to="/logout"><i className="fa fa-sign-in" />  Logout   </Link>
                                
                                  :
                                   <div>
                                  <Link to="/login"><i className="fa fa-sign-in" />  Login   </Link>
                                  <Link to="/register"><i className="fa fa-sign-in" />   Register  </Link></div>
                                }
                                </ul>
                          
                                <hr/>
                              </div>
                          
                        </div>
                    </div>
                </nav>
             
                </div>
               
        );
    }
}

export default Header;