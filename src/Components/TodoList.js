import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import classNames from 'classnames'
import { Card, CardContent, CardActions, Button, Typography, Collapse, TextField, IconButton, CircularProgress, Checkbox, FormControlLabel, Grow } from '../../node_modules/@material-ui/core';
import TodoListItem from './TodoListItem'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'

import { connect } from 'react-redux';
import { addListItem, getPublicTasks } from '../Redux/actions'

const styles = theme => ({
    root: {
      width: "100%",
      maxWidth: 700,
      margin: "50px auto",
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
    },
    buttonProgress: {
        color: theme.palette.background.primary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    privateCheck: {
        marginLeft: 20
    },
    importance: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "center"
    }
});



class TodoList extends Component {

    state = {
        expanded: false,
        taskInput: '',
        loading: false,
        privateChecked: false,
        cardAnimation: false
    }

    componentDidMount(){

        if(!this.props.user.id){
            this.props.history.push('/')
        }

        this.props.getPublicTasks();

        this.setState({
            cardAnimation: true
        })
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    addList = (event) => {
        event.preventDefault();
        const {taskInput, privateChecked} = this.state
        if(taskInput !== ""){
            this.setState({loading: true})
            this.props.addListItem(taskInput, this.props.user.name, privateChecked, null, () => {
                this.setState({
                    taskInput: '',
                    loading: false
                })
                this.handleExpandClick();
                this.props.getPublicTasks();
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

    handlePrivateCheck = () => {
        this.setState({privateChecked: !this.state.privateChecked})
    }

    renderListItems = (value, i) => {
        const { taskList, getPublicTasks } = this.props;

        return (i === taskList.length -1 ?
        <TodoListItem  reload={getPublicTasks} newOne={true} checked={value.checked} text={value.todo} id={value.id} key={value.id} name={value.name} />
        : <TodoListItem  reload={getPublicTasks} newOne={false} checked={value.checked} text={value.todo} id={value.id} key={value.id} name={value.name} />)
    }

    render() {
        const { classes, taskList } = this.props;
        const { expanded, taskInput, loading, privateChecked, cardAnimation } = this.state;

        return (
            <div className={classes.root}>
                <Grow in={cardAnimation}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="display1" component="h1">
                            TODO
                            </Typography>
                            <List>
                            {
                                taskList.length < 1 ? <Typography gutterBottom variant="headline" component="h1">Nothing todo!</Typography> : taskList.map(this.renderListItems)
                            }
                            </List>
                        </CardContent>
                        <CardActions> 
                            <div className={classes.btnContainer}>
                                <IconButton 
                                    color="secondary"
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
                                            disabled={loading}
                                            color="secondary">
                                            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                            Save
                                        </Button>
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                checked={privateChecked}
                                                onChange={this.handlePrivateCheck}
                                                className={classes.privateCheck}
                                                />
                                            }
                                            label="Private"
                                        />
                                        <Typography paragraph variant="caption">Private tasks can be found on the profile page!</Typography>
                                    </div>
                                </form>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grow>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        taskList: state.tasks.public,
        user: state.user
    }
}

export default withStyles(styles)(connect(mapStateToProps, { addListItem, getPublicTasks })(TodoList))
