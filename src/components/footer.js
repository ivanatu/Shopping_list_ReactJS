import React, {Component} from 'react'

class Footer extends Component{
    render(){
        return(
            <div>
                <footer className="fixed-bottom" >
                    <div className="container">
                        <span className="navbar-text ml-auto">&copy; Shopping List Inc All rights reserved</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;