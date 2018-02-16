import React, { Component } from 'react';
import axios from 'axios';
import Lists from './lists';
import { notify } from 'react-notify-toast';

class Addlist extends Component {

  constructor(props){
    super(props)
    
          this.state = {
              name:'',
          };
   }

  //handle submit for adding a list
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/shoppinglists`, {list:this.state.name}, { headers: { 'Authorization': localStorage.getItem("TK") } })
      .then((response) => {
        document.querySelector(`#close${2}`).click();
        notify.show("Shopping list successfully created", "success", 5000)
        this.props.getLists();
        this.setState({name: ""})
      })
      .catch(function (error) {
        if (error.response) {
          const { data: { message } } = error.response;
          notify.show(message, 'error', 5000)
        }
      });
  }

  handleChange = (event)=>{
    const { value} = event.target;
    this.setState({
        name: value,
    })
}

  render() {
    return (
      <div>
        <div id="myModal" className="modal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Add List</h4>
                <button type="button" className="close" id={`close${2}`} data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">
                <form method="POST" name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    SHOPPING LIST NAME:
                  <input type="text" className="form-control" id="list" name="list" onChange={this.handleChange} value={this.state.name} required />
                  </div>

                  <button className="btn btn-info " type="submit">Save List</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Addlist;