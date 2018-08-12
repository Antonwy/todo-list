import React from 'react';
import TodoList from './Components/TodoList';
import LogIn from './Components/LogIn'
import Register from './Components/Register'
import { Route, Redirect } from 'react-router-dom'
import Profile from './Components/Profile'
import NavBarDrawer from './Components/NavBarDrawer';
import CreateGroup from './Components/CreateGroup'
import GroupTasks from './Components/GroupTasks';

const url = process.env.PUBLIC_URL;

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
          <Route exact path={url + "/"} component={LogIn} />
          <Route path={url + "/tasks"} component={TodoList} />
          <Route path={url + "/register"} component={Register} />
          <Route path={url + "/profile"} component={Profile} />
          <Route path={url + "/createGroup"} component={CreateGroup} />
          <Route path={url + "/group"} component={GroupTasks} />
        </NavBarDrawer>
      </div>
    )
  }
  
}

export default App;
