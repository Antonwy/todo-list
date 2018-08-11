import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import TodoList from './Components/TodoList';
import LogIn from './Components/LogIn'
import Register from './Components/Register'
import { Route } from 'react-router-dom'
import Profile from './Components/Profile'



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      logedIn: false
    }
    
  }

  render(){
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={LogIn} />
        <Route path="/tasks" component={TodoList} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
  
}

export default App;
