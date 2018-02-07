import React, { Component } from 'react'
import _ from 'lodash'
import './login.css';
import TodoListItem from './todo_list_item'
import TodoHeader from './todos-list-header'


class ToDoList extends Component{

    renderItems(){

        const props = _.omit(this.props, 'todos');
        return _.map ( this.props.todos, (todo, index)=> <TodoListItem key={index} {...todo} {...props}/>);
    }
    render(){
        return(
            <div className="search">
              <table>
                <TodoHeader />
                    <tbody>
                      { this.renderItems() }
                    </tbody>
              </table>
            </div>
        );
    }
}

export default ToDoList;


