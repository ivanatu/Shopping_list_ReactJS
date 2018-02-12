import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';

class EditList extends Component{

    constructor(props) {
        super(props)
  
        this.state = {
            name:'',
        };
    }
    
    componentDidMount(){
        this.setState({
            name: this.props.listName,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
       
        const {listId, listName} = this.props;
        axios.put(`http://localhost:5000/shoppinglists/${listId}`,{list:this.state.name}, {headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
              console.log(response);
              console.log(response.data.list);
            
            document.querySelector(`#close${this.props.listId}`).click();
            this.props.getLists();
            notify.show(response.data.message,"success", 4000);
            // this.props.history.push('/dashboard')
          })
          .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
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
    render(){
        return(
             <div>
            
             <div id={`myModall${this.props.listId}`} className="modal" role="dialog">
             <div className="modal-dialog">
               <div className="modal-content">
                 <div className="modal-header">
                 <h4>Edit List</h4>
                   <button type="button" className="close" id={`close${this.props.listId}`} data-dismiss="modal">&times;</button>
                 
                 </div>
                 <div className="modal-body">
                 <form  method="POST"  name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                 
                  <div className="form-group">
                      NEW LIST NAME:
                          <input type="text" className="form-control" name="list" value={this.state.name} onChange={this.handleChange} required/>   
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

export default EditList;