import React from 'react';
import TodoList from './Components/TodoList';
import LogIn from './Components/LogIn'
import Register from './Components/Register'
import { Route } from 'react-router-dom'
import Profile from './Components/Profile'
import NavBarDrawer from './Components/NavBarDrawer';
import CreateGroup from './Components/CreateGroup'
import GroupTasks from './Components/GroupTasks';
import Settings from './Components/Settings'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class App extends React.Component {

  

  render(){

    const theme = createMuiTheme({
      palette: {
        primary: this.props.colors.primary,
        secondary: this.props.colors.secondary
      },
    });

    document.querySelector('body').style.backgroundColor = theme.palette.primary[500];

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <NavBarDrawer>
            <Route exact path="/" component={LogIn} />
            <Route path="/tasks" component={TodoList} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/createGroup" component={CreateGroup} />
            <Route path="/group" component={GroupTasks} />
            <Route path="/settings" component={Settings} />
          </NavBarDrawer>
        </MuiThemeProvider>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return{
    colors: state.colors
  }
}

export default withRouter(connect(mapStateToProps)(App));
