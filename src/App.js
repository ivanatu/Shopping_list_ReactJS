import React, { Component } from 'react';
import './App.css';
import './static/styles.css'
import Additem from './components/additem'
import Register from './components/register'
import Login from './components/login'
import Addlist from './components/addlist'
import Header from './components/header'
import Footer from './components/footer'
import List from './components/lists'
import Items from './components/items'
import EditList from './components/editlist'
import EditItem from './components/edititem'
import Notifications from 'react-notify-toast'
import { Route, Switch} from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL=`http://localhost:5000`;
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
          <Route exact path="/addlist" component={Addlist}/>
          <Route exact path="/list" component={List}/>
          <Route exact path="/item" component={Items}/>
          <Route exact path="/:listName/:listId/items" component={Items}/>
          <Route exact path="/items/:listId" component={Additem}/>
          <Route exact path="/editlist/:listId/:listName" component={EditList}/>
          <Route exact path="/edititem/:listId/:itemId" component={EditItem}/>
          </Switch>
      <Footer/>
      </div>
    );
  }

}

export default App;

