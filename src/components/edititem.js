import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast';

class EditItem extends Component{
    

    constructor(props) {
        super(props)
  
        this.state = {
            name:'',
            price:'',
        };
    }

    componentDidMount(){
        this.setState({
            name: this.props.itemName,
            price: this.props.itemPrice,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
       
        const {listId, itemId, itemName} = this.props;
        axios.put(`http://localhost:5000/shoppinglists/${listId}/items/${itemId}`,
        {name:this.state.name, price:this.state.price}, 
        {headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
              console.log(response);
              console.log(response.data.name);
            document.querySelector(`#close${this.props.itemId}`).click();
            this.props.getItems();
            notify.show(response.data.message,"success", 4000);
            
          })
          .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
        
    }

    handleNameChange = (event)=>{
        const { value} = event.target;
        this.setState({
            name: value,
        })
    }

    handlePriceChange = (event)=>{
        const { value} = event.target;
        this.setState({
            price: value,
        })
    }

    render(){
        return(
            <div>
           
            <div id={`myModals${this.props.itemId}`} className="modal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                <h4>Edit Item</h4>
                  <button type="button" className="close" id={`close${this.props.itemId}`} data-dismiss="modal">&times;</button>
                
                </div>
                <div className="modal-body">
                <form  method="POST"  name="login_form" className="register-form" onSubmit={this.handleSubmit}>
                
                 <div className="form-group">
                     NEW ITEM NAME:
                         <input type="text" className="form-control" name="item" value={this.state.name} onChange={this.handleNameChange} required/>   
                 </div>

                 <div className="form-group">
                     NEW ITEM PRICE:
                     <input type="text" className="form-control" name="price" value={this.state.price} onChange={this.handlePriceChange} required min="0" step="1"/>  
                 </div>
       
                         <button className="btn btn-info " type="submit">Save Item</button>
                                    
                  </form>
                </div>
                
              </div>
          
          </div>
       </div>
            </div>
        );
    }
}

export default EditItem;