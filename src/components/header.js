import React, {Component} from 'react'
import { Link} from 'react-router-dom'


class Header extends Component{
    
    //this function handles the logout by removing the token
    OnLogout(){
        // console.log(localStorage.getItem("TK"));
        localStorage.removeItem("TK")
        return(
            this.props.history.push("/login")
        );
      }

    //rending the navigation bar with the login, register, home, and logout links
    render(){
        return(
           
        <div>
            <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm " >
                <div className="container">
                    <h1 className="navbar-brand m-o align-content-end mr-auto">WELCOME TO YOUR SHOPPING LIST</h1>
                    
                    <div className="navbar-nav ">
                            <div>
                            <ul>
                                
                                { localStorage.getItem("TK") ?
                                <div>
                                <Link to="/list"><i className="fa fa-home" />  Home   </Link>
                                <Link to="/login" onClick={this.OnLogout}><i className="fa fa-sign-in" />  Logout  </Link></div>
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