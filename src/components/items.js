import React, { Component } from 'react';
import axios from 'axios';
import EditItem from './edititem'
import Additem from './additem'
import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify';
import {notify} from 'react-notify-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';


class Items extends Component{
    
    constructor(props) {
        super(props)
     
    //initialize states
        this.state = {
        item: [],
        name: '',
        price: '',
        isEditing: false,
        searched:'',
        per_page: '',
        total: ''
        };
    }
   
    //this renders the model for the once the delete is called
    onDeleteClick = (listId, itemId, itemName)  => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete ' +itemName,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => this.onListDelete(listId, itemId)
        })
    };

    //this will do the actual deleting of items from the database
    onListDelete = (listId, itemId) => {
        axios.delete(`/shoppinglists/${listId}/items/${itemId}`, {
            headers: {
               'Authorization': localStorage.getItem("TK")
            }
        })
        .then(response => {
            toast.success(response.data.message)
            // reload items state after delete
            notify.show(response.data.message,'success', 4000);
            this.fetchItems();
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
    }

    //this displays the items that match a certain search criteria
    handleSearch = (event, numbers) => {
        event.preventDefault();
        const {match: {params}} = this.props;
        const listId = params.listId;
       const search = event.target.search.value
       this.setState({searched: search});
       console.log("search this", search)
        axios.get(`/shoppinglists/${listId}/items?q=${search}&page=${numbers}`,{headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
             console.log("ebivude",response.data)
              this.setState({
                item: response.data,
                per_page: response.data.items[0].per_page,
                total: response.data.items[0].total,
                search:true,
                pages: response.data.count,
            })
              
              notify.show(response.data.message, "success", 4000)
              
          })
          .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
        }

    //this displays all the items in the shopping list with pagination
    fetchItems = ()=> {
        const {match: {params}} = this.props;
        const listId = params.listId;
        axios.get(`/shoppinglists/${listId}/items`, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then(response => {
            console.log(response)
            console.log(response.data.count)
            this.setState({
            item: response.data,
            per_page: response.data.items[0].per_page,
            total: response.data.items[0].total,
            showMessage:false,
            pages: response.data.count,
            });
            notify.show(response.data.message, "error", 4000)
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
    }


    //handle the calling of the items
    componentDidMount(){
        this.fetchItems()
    }

    //this displays the items on a particular page once its clicked
    handleClick(number){
        // if (this.state.next_page)
        const {match: {params}} = this.props;
        const listId = params.listId;
        axios.get(`/shoppinglists/${listId}/items?page=${number}`, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({
            item: response.data,
            showMessage:false,
            });
            notify.show(response.data.message, "error", 4000)

        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
    };

    handleClicks = (event, numbers) => {
        console.log("i tried this ");
          event.preventDefault();
          const {match: {params}} = this.props;
          const listId = params.listId;
          const search = this.state.searched
        
        axios.get(`/shoppinglists/${listId}/items?q=${search}&page=${numbers}`, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then((response)=>{
            // console.log(response.data)
            this.setState({
            item: response.data,
            showMessage:false,
            });
            
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
    };
    
    //this renders the component and also handles the pagination
     render () {
            console.log(this.state);
            // const {match: {params}} = this.props;
            const listId = this.props.match.params.listId;
            const listName = this.props.match.params.listName;
            const {per_page, total }=this.state
            let loadPagination;
            const pageNumbers = [];
            if(total > 8){
                for (let i = 1; i <= Math.ceil(total / per_page); i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
            }

            if(this.state.search===true){
                loadPagination = 
                pageNumbers.map((numbers) => {
                return(
                    <li className="page-item" key={numbers} style={{display: 'inline-block'}}>
                    <a className="page-link" onClick={event => this.handleClicks(event, numbers)} key={numbers} id={numbers}>{numbers}</a>
                    </li> 
                );  
                })   
            }
            else{
                loadPagination = 
                pageNumbers.map((number) => {
                return(
                    <li className="page-item" key={number} style={{display: 'inline-block'}}>
                    <a className="page-link" onClick={() => this.handleClick(number)} key={number} id={number}>{number}</a>
                    </li> 
                );  
                })   
            }
                        
            return (
        <div>
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Add Items</button>
                <Additem listId={listId} getItems={this.fetchItems}/>
                
                <div className="itemsheader">
                    <h2>{listName}'s items</h2>
                </div>
                <div className="form-inline align-content">
                <form className="form-inline align-content" onSubmit = {event => this.handleSearch(event, 1)}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" required min="0" step="1"/>
                
                <button  type="submit"><i className="fa fa-search"></i></button>
                </form>
                </div>

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
                    <td><i className="fa fa-edit" data-toggle="modal" data-target={`#myModals${item.itemid}`}></i></td>
                    <td><i className="fa fa-trash" onClick = {() => this.onDeleteClick(listId, item.itemid, item.name)}></i></td> 
                    <EditItem listId={listId} itemId={item.itemid} itemName={item.name} itemPrice={item.price} getItems={this.fetchItems}/>  
            </tr>
            
                        ); 
                        
                    }))
    
                    : null
                    }
                    </tbody> 
                </table>
            </div>
            <ul className="pagination justify-content-center">
            {loadPagination}
            </ul>
            </div>
            );
        }       
}

export default Items;