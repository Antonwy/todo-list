import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar } from '../../node_modules/@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange';


const styles = theme => ({
  appBarColor: {
    backgroundColor: "#252525",
  },
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  registerBTN: {
    marginLeft: 10
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
    textDecoration: "none"
  },
  name: {
    display: "flex",
    alignItems: "center"
  }
});

{/* <Button variant="outlined" color="inherit" component={Link} to="/">Profile</Button> */}

const NavBar = (props) => {

  const { classes, user } = props;
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBarColor}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to="/tasks">
            <HomeIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Todo list
          </Typography>
          {
            !user.id 
            ? 
            <div>
              <Button variant="outlined" color="inherit" component={Link} to="/">Login</Button>
              <Button className={classes.registerBTN} variant="outlined" color="inherit" component={Link} to="/register">Register</Button>
            </div>
            :
            <div className={classes.name}>
              <Typography component={Link} to="/profile" style={{marginRight: 10}} color="inherit">{user.name}</Typography>
              <Avatar className={classes.orangeAvatar} component={Link} to="/profile">{user.name.charAt(0).toUpperCase()}</Avatar>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    user: state.user
  }
}

export default withStyles(styles)(connect(mapStateToProps)(NavBar))


