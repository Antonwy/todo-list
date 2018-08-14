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
import { LOCAL_STORAGE_PRIMARY_COLOR, LOCAL_STORAGE_SECONDARY_COLOR } from './Redux/constants';

class App extends React.Component {

  

  render(){

    let primary = this.props.colors.primary;
    let secondary = this.props.colors.secondary

    if(localStorage.getItem(LOCAL_STORAGE_PRIMARY_COLOR)){
      primary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PRIMARY_COLOR))
    }

    if(localStorage.getItem(LOCAL_STORAGE_SECONDARY_COLOR)){
      secondary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SECONDARY_COLOR))
    }

    const theme = createMuiTheme({
      palette: {
        primary: primary,
        secondary: secondary
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
