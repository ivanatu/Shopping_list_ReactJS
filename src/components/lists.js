import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash'
import cookie from 'react-cookie';
import { confirmAlert } from 'react-confirm-alert'; 
import { toast, ToastContainer } from 'react-toastify';
import TodoListItem from './todo_list_item'
import TodoHeader from './todos-list-header'
import EditList from './editlist'
import Items from './items'
import 'react-confirm-alert/src/react-confirm-alert.css';


class List extends Component{

    constructor(props) {
        super(props)

        this.state = {
        list: [],
        isEditing: false
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
            window.location.reload();
        })
        .catch(error => {
        })
    }
    componentDidMount(){
       
        axios.get('http://localhost:5000/shoppinglists', {
            headers: { 'Authorization': localStorage.getItem("TK") }
        })
        .then(response => {
            console.log(response.data);            
            const list = response.data;
               this.setState({list})
               console.log('list ',list.lists[0])

        })
        .catch(function (error) {
            console.log(error);
          });
    }

    // renderTaskSection(){
    //     const {task, isCompleted} = this.props;
        

    //     const taskStyle = {
    //         color: isCompleted ? 'green' : 'red',
    //         cursor: 'pointer'
    //     };

    // }
    
    


    render () {
        
        console.log(this.state);
        return (
            
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
                        <td><button onClick = {() => this.onEditClick(list.id)}>EDIT</button></td>
                        <td><button onClick = {() => this.onDeleteClick(list.id, list.list)}>DELETE</button></td>
                        <td><button onClick = {() => this.onListClick(list.id)}>VIEW ITEMS</button></td>
                    
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


    onEditClick = (listId) =>{
        this.props.history.push(`/editlist/${listId}`)
    }

    onListClick = (listId) =>{
        this.props.history.push(`/items/${listId}`)
    }
    
    

}

export default List;