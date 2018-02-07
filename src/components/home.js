import React, {Component} from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import axios from 'axios';
import Items from './items';


class Home extends Component{

    handleSubmit = (event) => {
        event.preventDefault();
        const {match: {params}} = this.props;
        const listId = params.listId;
        

        axios.post(`http://localhost:5000/shoppinglists/${listId}/items`,
        {name:event.target.name.value, price:event.target.price.value}, {
                headers: { 'Authorization': localStorage.getItem("TK") }
            })
          .then( (response) =>{
              console.log(response.data);
              console.log(response.data.name);
              // <Dashboard/>
              window.location.reload();
              // this.props.history.push("/items")
            
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    render(){
        return(
            <div>
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Add Items</button>
            <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
          
           
              <div className="modal-content">
                <div className="modal-header">
                <h4>Add item</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                
                </div>
                <div className="modal-body">
                <form  method="POST"  name="create_form" className="register-form" onSubmit={this.handleSubmit}>
                
                      <div className="form-group">
                          NAME:
                              <input type="text" className="form-control" id="name" name="name"/>   
                      </div>
  
                      <div className="form-group">
                          PRICE:
                              <input type="text" className="form-control" id="price" name="price"/>
                      </div>
                  
                              <button className="btn btn-info " type="submit">Save Item</button>
                                    
                  </form>
                </div>
                
              </div>
          
            </div>
          </div>
          <Items {...this.props}/>
            </div>
        );      
    }
};


export default Home;