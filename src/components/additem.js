import React, {Component} from 'react'
import axios from 'axios';
import {notify} from 'react-notify-toast';


class Additem extends Component{
    constructor(props){
        super(props)
        
              this.state = {
                  name:'',
                  price:''
              };
       }

//this handles the submit and adds an item to the shopping list in database
handleSubmit = (event) => {
    event.preventDefault();

    const {listId} = this.props;
    
    axios.post(`/shoppinglists/${listId}/items`,
    {name:this.state.name, price:this.state.price}, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then( (response) =>{
            // console.log(response.data);
            document.querySelector(`#close${2}`).click();
            notify.show("Item successfully created", "success", 5000)
            this.props.getItems();
            this.setState({
                name:"",
                price:"",
            })
            
          
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
        
}

handleChange = (event)=>{
    const { value,name} = event.target;
    this.setState({
       [name]: value,
    })
}

render(){
    return(
    <div>     
        <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Add item</h4>
                        <button type="button" className="close"  id={`close${2}`} data-dismiss="modal">&times;</button>
                    </div>

                <div className="modal-body">
                    <form  method="POST"  id="create_form" name="create_form" className="register-form" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          NAME:
                              <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} value={this.state.name}  required/>   
                      </div>
  
                      <div className="form-group">
                          PRICE:
                              <input type="text" className="form-control" id="price" name="price" onChange={this.handleChange} value={this.state.price}  required/>
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
};


export default Additem;