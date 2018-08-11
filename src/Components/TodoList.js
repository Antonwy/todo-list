import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import classNames from 'classnames'
import { Card, CardContent, CardActions, Button, Typography, Collapse, TextField, IconButton } from '../../node_modules/@material-ui/core';
import TodoListItem from './TodoListItem'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'
import { SnackBar } from './MaterialUI'

import { connect } from 'react-redux';
import { addListItem, getTasks } from '../Redux/actions'

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 700,
      [theme.breakpoints.down("sm")]: {
        maxWidth: 500
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: 300
      },
      backgroundColor: theme.palette.background.paper,
      margin: "50px auto"
    },
    textField: {
        width: "100%"
    },
    buttonClass: {
        margin: "20px auto"
    },
    container: {
        width: "100%"
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    btnContainer: {
        marginBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    fabPos: {
        marginRight: 10
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        })
    },
    expandOpen: {
        transform: 'rotate(45deg)',
    }
});



class TodoList extends Component {

    state = {
        expanded: false,
        taskInput: '',
    }

    componentDidMount(){
        this.props.getTasks();
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    addList = (event) => {
        event.preventDefault();
        const {taskInput} = this.state
        if(taskInput !== ""){
            this.props.addListItem(taskInput, () => {
                this.setState({
                    taskInput: '',
                    editMode: false
                })
                this.handleExpandClick();
                this.props.getTasks();
            });
        }
    }

    onInputChange = (event) => {
        this.setState({
            taskInput: event.target.value
        })
    }

    handleSBClose = () => {
        this.setState({
            showSB: false
        })
    }

    editClicked = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        const { classes, taskList } = this.props;
        const { expanded, taskInput, editMode } = this.state;

        return (
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h1">
                        TODO
                        </Typography>
                        <List>
                        {taskList.map((value, i) => (
                            i === taskList.length -1 ?
                            <TodoListItem newOne={true} checked={value.checked} text={value.todo} editMode={editMode} id={value.id} key={value.id}/>
                            : <TodoListItem newOne={false} checked={value.checked} text={value.todo} editMode={editMode} id={value.id} key={value.id}/>
                        ))}
                        </List>
                    </CardContent>
                    <CardActions> 
                        <div className={classes.btnContainer}>
                            <IconButton 
                                color="primary"
                                className={classNames(classes.expand, classes.fabPos,{
                                    [classes.expandOpen] : expanded
                                })}
                                onClick={this.handleExpandClick}
                            >
                            <AddIcon />
                            </IconButton>
                        </div>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph variant="headline">
                                Add Task:
                            </Typography>
                            <form onSubmit={this.addList} noValidate>
                                <TextField
                                    label="Task"
                                    className={classes.textField}
                                    value={taskInput}
                                    onChange={this.onInputChange}
                                />
                                <div className={classes.container}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        className={classes.buttonClass}
                                        color="primary">
                                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        taskList: state.tasks
    }
}

export default withStyles(styles)(connect(mapStateToProps, { addListItem, getTasks })(TodoList))
