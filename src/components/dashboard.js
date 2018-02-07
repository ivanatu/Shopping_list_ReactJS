import React, { Component } from 'react';
import axios from 'axios';
import Lists from './lists'

class Dashboard extends Component{
    // componentDidMount(){
    //     alert(localStorage.getItem("TK"))
    // }

    handleSubmit = (event) => {
        event.preventDefault();
       
        axios.post('http://localhost:5000/shoppinglists',{list:event.target.list.value}, {headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
              console.log(response);
              console.log(response.data.list);
              // <Dashboard/>
              window.location.reload();
              // this.props.history.push("/items")
            
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }


render(){
  console.log(this.props)
    return(
      
       <div>
       <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Add List</button>
     
     <div id="myModal" className="modal fade" role="dialog">
     <div className="modal-dialog">
   
    
       <div className="modal-content">
         <div className="modal-header">
         <h4>Add List</h4>
           <button type="button" className="close" data-dismiss="modal">&times;</button>
         
         </div>
         <div className="modal-body">
         <form  method="POST"  name="login_form" className="register-form" onSubmit={this.handleSubmit}>
         
          <div className="form-group">
              SHOPPING LIST NAME:
                  <input type="text" className="form-control" id="item" name="list"/>   
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