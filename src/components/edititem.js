import React, { Component } from 'react';
import axios from 'axios';


class EditItem extends Component{

    handleSubmit = (event) => {
        event.preventDefault();
       
        const {match: {params}} = this.props;
        const listId = params.listId;
        const itemId = params.itemId;
        console.log("this"+listId);
        console.log("csdcssdcsdcsdc");
        axios.put(`http://localhost:5000/shoppinglists/${listId}/items/${itemId}`,
        {name:event.target.name.value, price:event.target.price.value}, 
        {headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
              console.log(response);
              console.log(response.data.name);
              console.log("csdcssdcsdcsdc");
               this.props.history.push(`/items/${listId}`)
            
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    render(){
        return(
            <div>
           
            <div class="container new_list_background card col-6">
            
            <h2 class="text-capitalize card-title mt-1">Edit List Item</h2>
            <div class="row">
                <div class="col">
                  
                    <form  method="POST"  name="create_form" class="register-form" onSubmit={this.handleSubmit}>

                    <div class="form-group">
                        NEW ITEM NAME:
                            <input type="text" class="form-control" id="name" name="name"/>   
                    </div>

                     <div class="form-group">
                       NEW ITEM PRICE:
                            <input type="text" class="form-control" id="price" name="price"/>
                    </div>
                    <div class="form-group"> 
                            <button class="btn btn-info " type="submit">Save Item</button>
                            
                    </div>
                    
                </form>
                </div>
            </div>
        </div>
            </div>
        );
    }
}

export default EditItem;