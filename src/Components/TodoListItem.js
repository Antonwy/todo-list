import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { IconButton, Input, Zoom, Card, Collapse, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import axios from 'axios'
import { ROOT_URL } from '../Redux/constants';
import { connect } from 'react-redux'
import { getPublicTasks, getPrivateTasks } from '../Redux/actions'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'


const styles = ({
    cardStyle: {
      margin: "10px 0"
    },
    deleteStyle: {
      marginRight: 10,
      
    },
    textField: {
      width: "80%"
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap"
    }
})


class TodoListItem extends React.Component {

  state = {
    editedValue: this.props.text,
    editMode: false,
    visible: this.props.newOne ? false : true,
    checked: this.props.checked
  }

  componentDidMount(){
    if(this.props.newOne){
      this.setState({visible: true})
    }
  }

  onEditClicked = () => {
    this.setState({editMode: true})
  }

  onDelete = () => {
    this.setState({visible: false})
    setTimeout(() => {
      axios.delete(`${ROOT_URL}/tasks/delete/${this.props.id}`)
      .then(data => {
        const { reloadId, reload } = this.props;
        reloadId ? reload(reloadId) : reload() 
      })
      .catch(err => console.log(err));
    }, 1000)
  }

  onEditChange = (event) => {
    this.setState({editedValue: event.target.value})
  }

  onSaveChanges = () => {
    const { editedValue } = this.state;

    if(editedValue !== ''){
      this.setState({
        editMode: false
      })
      setTimeout(() => {
        axios.put(`${ROOT_URL}/tasks/update/${this.props.id}`, {
          todo: editedValue
        })
        .then(respose => {
          const { reloadId, reload } = this.props;
          reloadId ? reload(reloadId) : reload() 
        })
        .catch(err => console.log(err))
      }, 1000)
    }
    
  }

  onCheckedClicked = (event) => {
    this.setState({
      checked: event.target.checked
    })
    setTimeout(() => {
      axios.put(`${ROOT_URL}/tasks/checked/${this.props.id}`, {
        checked: this.state.checked
      })
      .then(res => {
        const { reloadId, reload } = this.props;
        reloadId ? reload(reloadId) : reload() 
      })
      .catch(err => console.log(err))
    }, 250)
  }

  render(){
    const { key, classes, name } = this.props;
    const { editMode, visible, editedValue, checked } = this.state;
    return (
      <Collapse in={visible} style={{padding: "0 3px"}}>
        <Card className={classes.cardStyle}>
          <ListItem key={key}>
                <ListItemText 
                  style={{
                          textDecoration: checked ? "line-through" : "none",
                          opacity: checked ? ".5" : "1",
                          transition: 'opacity 250ms',
                        }}
                  primary={editedValue}
                  secondary={`- ${name}`} />
                <ListItemSecondaryAction>
                    <Checkbox 
                      checked={checked}
                      onChange={this.onCheckedClicked}
                    />
                    <IconButton
                        color="secondary"
                        onClick={editMode ? this.onSaveChanges : this.onEditClicked}>
                        {editMode ? <DoneIcon /> : <EditIcon />}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={editMode} timeout="auto" unmountOnExit>
                <CardContent className={classes.cardContainer}>
                    <Zoom 
                      style={{ transitionDelay: editMode ? 250 : 0}}
                      in={editMode}
                      >
                      <Input
                            className={classes.textField}
                            value={editedValue}
                            onChange={this.onEditChange}
                            inputProps={{
                              'aria-label': 'Description',
                      }}/>
                    </Zoom>
                    <Zoom
                      style={{ transitionDelay: editMode ? 250 : 0}}
                      in={editMode}
                      >
                      <IconButton 
                          className={classes.deleteStyle}
                          color="secondary"
                          size="small"
                          onClick={this.onDelete}>
                          <Delete />
                        </IconButton>
                    </Zoom>
                </CardContent>
            </Collapse>
          </Card>
      </Collapse>
    )
  }
  
}

export default connect(null, {getPublicTasks, getPrivateTasks})(withStyles(styles)(TodoListItem));
