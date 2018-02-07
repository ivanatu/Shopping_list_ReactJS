import React, { Component } from 'react';
import axios from 'axios';

class EditList extends Component{

    handleSubmit = (event) => {
        event.preventDefault();
       
        const {match: {params}} = this.props;
        const listId = params.listId;
        axios.put(`http://localhost:5000/shoppinglists/${listId}`,{list:event.target.list.value}, {headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
              console.log(response);
              console.log(response.data.list);
               this.props.history.push("/dashboard")
            
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    render(){
        return(
             <div>
             <div className="container">
             <div className="row">
                  <div className="container new_list_background card col-6" >
                     <h2 className="text-capitalize card-title mt-1">EDIT LIST NAME </h2>
                    <form method="POST" className="form-horizontal" onSubmit={this.handleSubmit}>
                             <div className="form-group">
                                 Enter new list name:
                                     <input type="text" name ="list" className="form-control" id="item"/>
                             </div>
             
                     
                             <div className="form-group">
                                 <div>
                                     <button className="btn btn-info " type="submit">Save Changes</button>
                                
                                 </div>
                             </div>
                    </form>
                </div>
                </div>
                </div>
             </div>
        );
    }
}

export default EditList;