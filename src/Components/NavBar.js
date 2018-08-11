import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'

const styles = theme => ({
  appBarColor: {
    backgroundColor: theme.palette.background.primary,
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
  }
});


const NavBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBarColor}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Todo list
          </Typography>
          <Button variant="outlined" color="inherit" component={Link} to="/login">Login</Button>
          <Button className={classes.registerBTN} variant="outlined" color="inherit" component={Link} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(NavBar)
