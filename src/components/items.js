import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';


class Items extends Component{
    
    constructor(props) {
        super(props)

        this.state = {
        item: [],
        name: '',
        price: '',
        isEditing: false
        };
    }

    onDeleteClick = (listId, itemId, itemName)  => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete ' +itemName,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => this.onListDelete(listId, itemId)
        })
    };

    onListDelete = (listId, itemId) => {
        axios.delete(`http://localhost:5000/shoppinglists/${listId}/items/${itemId}`, {
            headers: {
               'Authorization': localStorage.getItem("TK")
            }
        })
        .then(response => {
            toast.success(response.data.message)
            // reload items state after delete
            window.location.reload();
        })
        .catch(error => {
        })
    }

    componentDidMount(){
        // const params = this.prps.match.params
        
        const {match: {params}} = this.props;
        const listId = params.listId;
         axios.get(`http://localhost:5000/shoppinglists/${listId}/items`, {
             headers: { 'Authorization': localStorage.getItem("TK") }
         })
         .then(response => {
             console.log(response.data);
             const item = response.data;
                this.setState({item})
 
         })
         .catch(function (error) {
             console.log(error);
           });
     }
     render () {
            
                console.log(this.state);
                const {match: {params}} = this.props;
                const listId = this.props.match.params.listId;
                return (
                <div className='container'>
                <table className="table table-hover table-striped">
                <thead>
                <tr>
                            <th>ITEM</th>
                            <th>PRICE</th>
                            <th colSpan="4">ACTION</th>
                </tr>
             </thead> 
             <tbody>  
                        {  
                        this.state.item.items?
                        (this.state.item.items.map((item) => {
                            return (          
                  
                 <tr key={item.itemid}>              
                                <td>{item.name}</td>
                                <td>{item.price}</td>        
                                <td><button onClick = {() => this.onEditClick(listId, item.itemid)}>EDIT</button></td>
                                <td><button onClick = {() => this.onDeleteClick(listId, item.itemid, item.name)}>DELETE</button></td>        
                </tr>
                
                            ); 
                           
                        }))
        
                        : null
                        }
                        </tbody> 
                    </table>
                </div>
                );
            }

        onEditClick = (listId,itemId) =>{
         this.props.history.push(`/edititem/${listId}/${itemId}`)
          }          
}

export default Items;