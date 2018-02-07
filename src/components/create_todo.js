import React, { Component } from 'react'
import _ from 'lodash'

class CreateToDo extends Component{
     
    constructor(props){
        super(props);
        this.state = {
            error: null
        };
    }

    renderError(){
        if(!this.state.error){
            return null;
        }
        return <div style={{color: 'red'}}>{this.state.error}</div>;
    }
    
    render(){
        return(
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type='text' placeholder='what needs to be done?' ref='CreateInput'/>
                <button>Create</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event){
        event.preventDefault();

        const createInput= this.refs.CreateInput;
        const task = createInput.value;
        const ValidateInput = this.ValidateInput(task);

        if (ValidateInput){
            this.setState({error: ValidateInput});
            return;
        }
        this.setState({error: null});
        this.props.CreateTask(this.refs.CreateInput.value);
        this.refs.CreateInput.value = '';
    }
    ValidateInput(task){
        if(!task){
            return "Please provide task";
        }
        else if(_.find(this.props.todos, todo => todo.task ===task)){
            return "Task already exists";
        }
        else{
            return null;
        }
    }

}

export default CreateToDo


