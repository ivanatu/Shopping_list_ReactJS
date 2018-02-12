import React, { Component } from 'react';
import './App.css';
import './static/styles.css'
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Header from './components/header'
import Footer from './components/footer'
import List from './components/lists'
import EditList from './components/editlist'
import EditItem from './components/edititem'
import Notifications from 'react-notify-toast';
import { Route, Switch} from 'react-router-dom'


class App extends Component {

  render() {
    return (

      <div>
      <Notifications options={{zIndex: 5000}}/>
      <Header/>
          <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/list" component={List}/>
          <Route exact path="/items/:listId" component={Home}/>
          <Route exact path="/editlist/:listId/:listName" component={EditList}/>
          <Route exact path="/edititem/:listId/:itemId" component={EditItem}/>
          </Switch>
      <Footer/>
      </div>
    );
  }

}

export default App;

