import React, { Component } from 'react';
import axios from 'axios';
import Lists from './lists';
import {notify} from 'react-notify-toast';

class Dashboard extends Component{
    constructor(props) {
      super(props)

      this.state = {
      list: []
      };
  }

handleSubmit = (event) => {
  event.preventDefault();
  axios.post(`http://localhost:5000/shoppinglists`, {list:event.target.list.value}, {headers: { 'Authorization': localStorage.getItem("TK") }})
    .then( (response) =>{ 
        const list = response.data;
        this.setState({list})
        document.querySelector(`#close${2}`).click();
        notify.show("Shopping list successfully created", "success", 5000)
        this.props.push('/dashboard')
    })
    .catch(function (error) {
      if(error.response){
        const { data:{message} } = error.response;
        notify.show(message, 'error', 5000)
    }
    });      
}

render(){
  console.log(this.props)
    return(
    <div>
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add List</h4>
              <button type="button" className="close" id={`close${2}`} data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <form  method="POST"  name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  SHOPPING LIST NAME:
                  <input type="text" className="form-control" id="item" name="list" required/>   
                </div>

                <button className="btn btn-info " type="submit">Save List</button>               
              </form>
            </div>
          </div>
        </div>
      </div>
   <Lists {...this.props}/>
    </div>
    );
}
}

export default Dashboard;