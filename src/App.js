import React from 'react';
import TodoList from './Components/TodoList';
import LogIn from './Components/LogIn'
import Register from './Components/Register'
import { Route } from 'react-router-dom'
import Profile from './Components/Profile'
import NavBarDrawer from './Components/NavBarDrawer';
import CreateGroup from './Components/CreateGroup'
import GroupTasks from './Components/GroupTasks';



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
        
        <NavBarDrawer>
          <Route exact path="/" component={LogIn} />
          <Route path="/tasks" component={TodoList} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/createGroup" component={CreateGroup} />
          <Route path="/group" component={GroupTasks} />
        </NavBarDrawer>
      </div>
    )
  }
  
}

export default App;
