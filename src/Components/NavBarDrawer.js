import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, ListItemText, ListItemIcon, ListItem } from '../../node_modules/@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { Home, Person, Group } from '@material-ui/icons'

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
  drawerPaper: {
    position: 'fixed',
    height: "100vh",
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
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
  },
  alignRight: {
      position: "absolute",
      right: 20
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
    const { classes, theme, user } = this.props;

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
            <Typography variant="title" color="inherit" noWrap>
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
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/tasks">
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText inset primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText inset primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/group">
                <ListItemIcon>
                    <Group />
                </ListItemIcon>
                <ListItemText inset primary="Group" />
            </ListItem>
          </List>
        </Drawer>
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

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps)(MiniDrawer));