import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import { toast} from 'react-toastify';
import EditList from './editlist'
import {notify} from 'react-notify-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';


class List extends Component{

    constructor(props) {
        super(props)

        this.state = {
        list: [],
        isEditing: false,
        activePage: 1,
        data:[],
        pageNumbers:[],
        showMessage:false, 
        q:'', 
        page:1, 
        has_next:false, 
        next_page:'',
        previous_page:'', 
        disablePrevious:'', 
        disableNext:'',
        // url: url+'?page=1',
        pages:null,
        per_page: '',
        total: ''
        };
    }
    
    onDeleteClick = (listId, listName)  => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete ' +listName,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => this.onListDelete(listId)
        })
    };

    onListDelete = (listId) => {
        axios.delete(`http://localhost:5000/shoppinglists/${listId}`, {
            headers: {
               'Authorization': localStorage.getItem("TK")
            }
        })
        .then(response => {
            toast.success(response.data.message)
            // reload items state after delete
            this.props.history.push('/dashboard')
        })
        .catch(error => {
        })
    }

    handleSearch = (event) => {
        event.preventDefault();
       const search = event.target.search.value
       console.log("KABDKAJBSKDAKJSBD", search)
        axios.get(`http://localhost:5000/shoppinglists?q=${search}`,{headers: { 'Authorization': localStorage.getItem("TK") }})
          .then( (response) =>{
             const list = response.data;
              this.setState({list})
            
               console.log('list hrere',list)
              this.props.history.push("/dashboard")
            
          })
          .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
        }

    fetchLists = ()=>{
            axios.get(`http://localhost:5000/shoppinglists`, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then(response => {
            console.log(response)
            console.log(response.data.count)
            this.setState({
            list: response.data,
            per_page: response.data.lists[0].per_page,
            total: response.data.lists[0].total,
            showMessage:false,
            pages: response.data.count,
            });
            
        })
        .catch(function (error) {
            if(error.response){
              const { data:{message} } = error.response;
              notify.show(message, 'error', 5000)
          }
          }); 
    }

    componentDidMount(){
        this.fetchLists()
    }

    handleClick(number){
        // if (this.state.next_page)
        axios.get(`http://localhost:5000/shoppinglists?page=${number}`, {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState({
            list: response.data,
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


    render () {
        
        console.log(this.state.per_page);
        const {list, per_page, total}=this.state
        let loadPagination;
        const pageNumbers = [];
       if(total > 8){
           for (let i = 1; i <= Math.ceil(total / per_page); i++) {
               pageNumbers.push(i);
           }
       } else {
           pageNumbers.push(1);
       }
    
       <div className="col-xs-11 col-sm-3 pull-right">
        {
            list?(
            loadPagination = 
            pageNumbers.map((number) => {
            return(
                <li className="page-item" key={number} style={{display: 'inline-block'}}>
                <a className="page-link" onClick={() => this.handleClick(number)} key={number} id={number}>{number}</a>
                </li> 
            );  
    }))
       :null
        }
        </div>
       
   
        return (
           <div>
           <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">Add List</button>

            <div className="form-inline align-content">
            <form className="form-inline align-content" onSubmit = {this.handleSearch}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" required/>
           
            <button  type="submit"><i className="fa fa-search"></i></button>
            </form>
            </div>
            
        <div className='container'>

        <table className="table table-hover table-striped">
        <thead>
        <tr>
                    <th colSpan="2">SHOPPING LIST</th>
                    <th colSpan="10">ACTION</th>
        </tr>
     </thead> 
     <tbody> 
                {  
                this.state.list.lists?
                (this.state.list.lists.map((list) => {
                    return (          
            
         <tr key={list.id}>             
                        <td>{list.list}</td>
                        <td><i className="fa fa-edit" data-toggle="modal" data-target={`#myModall${list.id}`}></i></td>
                        <td><i className="fa fa-trash" onClick = {() => this.onDeleteClick(list.id, list.list)}></i></td>
                        <td><i className="fa fa-bars" onClick = {() => this.onListClick(list.id)}></i></td>
                        <EditList listId={list.id} listName={list.list} getLists={this.fetchLists}/>
                    
        </tr>
         
                    ); 
                   
                }))

                : null
                }
                </tbody> 
            </table>
            <ul className="pagination justify-content-center">
           {loadPagination}
           </ul>
        </div>
        </div>
        );
    }

    onListClick = (listId) =>{
        this.props.history.push(`/items/${listId}`)
    }
    
    

}

export default List;