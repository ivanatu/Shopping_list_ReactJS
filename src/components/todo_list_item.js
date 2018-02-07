import React, { Component } from 'react'
import Lists from './lists'
import axios from 'axios';

class TodoListItem extends Component{

    constructor(props){
        super(props);
        this.state = { 
            isEditing:false
      };
    }

    handleSubmit = (list) => {
        this.props.onEdit(this.props.id, list);

        this.setState({
            list: list,
        });
    };

    renderTaskSection(){
        const {task, isCompleted} = this.props;
        

        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        };

        if(this.state.isEditing){
            return(
                <td>
                    <form method="POST" onSubmit={this.onSaveClick.bind(this)}>
                    <input type = "text" placeholder="edit list" value={this.state.list}/>
                    </form>
                </td>
            );

            callback: (data) => {
                if (data) {
                    this.handleSubmit(data.list)
                }
            }
        }
        return(
            <td style = {taskStyle}
               
            >
            { task }
            </td>
        );
    }

    renderActionSection(){
        if (this.state.isEditing){
            return(<td>
                <button onClick = {this.onSaveClick.bind(this)}>save</button>
                <button onClick = {()=> {this.onCancelClick()}}>cancel</button>
            </td>
          ); 
        }
        return(
        <td>
            <button onClick = {this.onEditClick.bind(this)}>Edit</button>
            
        </td>
        );
    }

    render(){
        return(
            <tr>
            {this.renderActionSection()}
            {this.renderTaskSection()}
            </tr>
        );
    }

    onEditClick(){
        this.setState({ isEditing:true });
    }

    onCancelClick = () => {
        this.setState({isEditing:false});
    }

    onSaveClick = (event) => {
        // event.preventDefault(); 

        // const oldTask= this.props.task;
        // const newTask= this.refs.editInput.value;
        // this.props.saveTask(oldTask, newTask);
        // this.setState({isEditing : false});

        event.preventDefault();
        
         axios.put('http://localhost:5000/shoppinglists/{list.id}',{list:event.target.list.value}, {headers: { 'Authorization': localStorage.getItem("TK") }})
           .then( (response) =>{
               console.log(response);
                 //  this.props.history.push("/list")
             
           })
           .catch(function (error) {
             console.log(error);
           });

    }
}

export default TodoListItem