import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import TodoList from './Components/TodoList';
import LogIn from './Components/LogIn'
import Register from './Components/Register'
import { BrowserRouter as Router, Route } from 'react-router-dom'



const App = () => {

  return (
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={TodoList} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  )
  
}

export default App;
