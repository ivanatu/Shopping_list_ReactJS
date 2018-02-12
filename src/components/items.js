import React, { Component } from 'react';
import axios from 'axios';
import EditItem from './edititem'
import { confirmAlert } from 'react-confirm-alert'; 
import { toast } from 'react-toastify';
import {notify} from 'react-notify-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';


class Items extends Component{
    
    constructor(props) {
        super(props)

        this.state = {
        item: [],
        name: '',
        price: '',
        isEditing: false,
        per_page: '',
        total: ''
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
            notify.show('response.data.message','success', 4000);
           this.props.history.push('/dashboard')
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
    }

    handleSearch = (event) => {
        event.preventDefault();
        const {match: {params}} = this.props;
        const listId = params.listId;
       const search = event.target.search.value
       console.log("search this", search)
        axios.get(`http://localhost:5000/shoppinglists/${listId}/items?q=${search}`,{headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
             const item = response.data;
              this.setState({item})
            
               console.log('itemsss',item)
              this.props.history.push(`/items/${listId}`)
            
          })
          .catch(function (error) {
            console.log(error.response.data.message);
            
          });
        }

    fetchItems = ()=> {
        const {match: {params}} = this.props;
        const listId = params.listId;
        axios.get(`http://localhost:5000/shoppinglists/${listId}/items`, {
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
        })
        .catch((xhr)=>{
            this.setState({showMessage:true})
        })
    }

    componentDidMount(){
        this.fetchItems()
    }

    handleClick(number){
        // if (this.state.next_page)
        const {match: {params}} = this.props;
        const listId = params.listId;
        axios.get(`http://localhost:5000/shoppinglists/${listId}/items?page=${number}`, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({
            item: response.data,
            showMessage:false,
            });

        })
        .catch(
            (xhr) => {
                console.log(xhr)
            }
        );
    };

     render () {
                console.log(this.state);
                // const {match: {params}} = this.props;
                const listId = this.props.match.params.listId;
                const {per_page, total, pages, }=this.state
                let loadPagination;
                const pageNumbers = [];
                console.log('pagesssss ', pages)
                if(total > 8){
                    for (let i = 1; i <= Math.ceil(total / per_page); i++) {
                        pageNumbers.push(i);
                    }
                } else {
                    pageNumbers.push(1);
                }

                loadPagination = 
                pageNumbers.map((number) => {
                    return(
                     
                             <li className="page-item" key={number} style={{display: 'inline-block'}}>
                             <a className="page-link" onClick={() => this.handleClick(number)} key={number} id={number}>{number}</a>
                             </li> 
                          );  
     
         })
                return (
                    <div>
                    <div className="form-inline align-content">
                    <form className="form-inline align-content" onSubmit = {this.handleSearch}>
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

        // onEditClick = (listId,itemId) =>{
        //  this.props.history.push(`/edititem/${listId}/${itemId}`)
        //   }          
}

export default Items;