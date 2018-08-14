import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Hidden } from '../../node_modules/@material-ui/core';
import DrawerVariant from './DrawerVariant';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 3.,
  },
  registerBTN: {
    marginLeft: 10
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary[300],
    textDecoration: "none"
  },
  name: {
    display: "flex",
    alignItems: "center"
  },
  alignRight: {
      position: "absolute",
      right: 20
  },
  barTitle: {
    display: "block",
    [theme.breakpoints.down('sm')]: {
      position: "fixed",
      left: 60
    },
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.barTitle}>
              Todo list
            </Typography>
            {
                !user.id 
                ? 
                <div className={classes.alignRight}>
                    <Button variant="outlined" color="inherit" component={Link} to="/" size="small">Login</Button>
                    <Button className={classes.registerBTN} variant="outlined" color="inherit" component={Link} to="/register" size="small">Register</Button>
                </div>
                :
                <div className={classNames(classes.name, classes.alignRight)}>
                    <Typography component={Link} to="/profile" style={{marginRight: 10}} color="inherit">{user.name}</Typography>
                    <Avatar className={classes.orangeAvatar} component={Link} to="/profile">{user.name.charAt(0).toUpperCase()}</Avatar>
                </div>
            }
          </Toolbar>
        </AppBar>
        <Hidden smDown>
          <DrawerVariant 
            variant="permanent" 
            open={this.state.open} 
            handleDrawerClose={this.handleDrawerClose}
          />
        </Hidden>
        <Hidden smUp>
          <DrawerVariant 
            variant="temporary" 
            open={this.state.open} 
            handleDrawerClose={this.handleDrawerClose}
          />
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return{
      user: state.user
    }
}

export default withStyles(styles)(
    connect(mapStateToProps)(MiniDrawer));