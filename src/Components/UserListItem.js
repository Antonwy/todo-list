import React, { Component } from 'react'
import { Collapse, Card, ListItem, ListItemText, Button, ListItemSecondaryAction, IconButton, Avatar } from '../../node_modules/@material-ui/core';
import { withStyles } from '@material-ui/core'
import { Add, Done } from '@material-ui/icons'


const styles = theme => ({
  cardSpacing: {
    margin: "10px 0"
  }
})


class UserListItem extends Component {

  addUser = () => {
    if(this.props.checked){
      this.props.onUnSelectUser(this.props.user)
    }else{
      this.props.onSelectUser(this.props.user)
    }
  }

  render() {
    const { classes, user: { name }, checked } = this.props;
    return (
      <Card className={classes.cardSpacing}>
        <ListItem>
          <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
          <ListItemText
            primary={name}>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              color="secondary"
              onClick={this.addUser}>
              {checked ? <Done /> : <Add />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Card>
    )
  }
}

export default withStyles(styles)(UserListItem);
