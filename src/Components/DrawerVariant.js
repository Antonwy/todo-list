import React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import { Home, Person, Group, SettingsApplications } from '@material-ui/icons'
import {  ListItemText, ListItemIcon, ListItem, IconButton } from '@material-ui/core'
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom'
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
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
})

const DrawerVariant = (props) => {
    const { variant, classes, open, handleDrawerClose, theme } = props;
  return (
    <Drawer
        variant={variant}
        classes={{
            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        >
        <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
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
            <ListItem button component={Link} to="/settings">
                <ListItemIcon>
                    <SettingsApplications />
                </ListItemIcon>
                <ListItemText inset primary="Settings" />
            </ListItem>
        </List>
    </Drawer>
  )
}

export default withStyles(styles, { withTheme: true })(DrawerVariant)
