import React, { Component } from 'react';
import { Card, Grow, CardContent, Typography, List, TextField, Button, Collapse, CircularProgress, CardActions, IconButton } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getGroup, getGroupTasks, addListItem, deleteGroup, getUser } from '../Redux/actions'
import TodoListItem from './TodoListItem';
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 700,
        margin: "50px auto"
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
    textField: {
        width: "100%"
    },
    btnContainer: {
        marginBottom: "10px",
        marginLeft: "auto",
        marginRight: "auto"
    },
    fabPos: {
        marginRight: 10
    },
    buttonClass: {
        margin: "20px auto"
    },
})

class GroupTasks extends Component {

    state = {
        cardAnimation: false,
        expanded: false,
        loading: false,
        taskInput: ''
    }

    componentDidMount(){

        const { history, user, getGroup, getGroupTasks } = this.props;

        if(!user.id){
           return history.push('/')
        }else if(user.groupid === 0){
           return history.push('/createGroup')
        }
        
        getGroup(user.groupid);
        getGroupTasks(user.groupid);
        
        this.setState({
            cardAnimation: true
        })
    }

    formatTime = (time) => {
        const d = new Date(time)
        const date = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();

        const dateString = date + "." +(month + 1) + "." + year;
        return dateString;
    }

    renderListItems = (value, i) => {
        const { tasks, getGroupTasks, group: {id} } = this.props;

        return (i === tasks.length -1 ?
        <TodoListItem reloadId={id} reload={getGroupTasks} newOne={true} checked={value.checked} text={value.todo} id={value.id} key={value.id} name={value.name} />
        : <TodoListItem reloadId={id} reload={getGroupTasks} newOne={false} checked={value.checked} text={value.todo} id={value.id} key={value.id} name={value.name} />)
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    onInputChange = (event) => {
        this.setState({
            taskInput: event.target.value
        })
    }

    addList = (event) => {
        event.preventDefault();
        const {taskInput } = this.state
        const { addListItem, user, group, getGroupTasks } = this.props;
        if(taskInput !== ""){
            this.setState({loading: true})
            addListItem(taskInput, user.name, false, group.id, () => {
                this.setState({
                    taskInput: '',
                    loading: false
                })
                this.handleExpandClick();
                getGroupTasks(group.id);
            });
        }
    }

    onDeleteGroup = (e) => {
        e.preventDefault();
        const { group: {id}, deleteGroup, user, getUser, history } = this.props;
        deleteGroup(id, () => {
            getUser(user.id, () => {
                history.push('/createGroup')
            })
        })
    }   

    render() {
        const { classes, group, tasks, user } = this.props;
        const { cardAnimation, expanded, loading, taskInput } = this.state;
        return (
        <div className={classes.root}>
            <Grow in={cardAnimation}>
                <Card>
                    <CardContent>
                        <Typography variant="display2" gutterBottom>{group.title}</Typography>
                        <Typography variant="subheading" gutterBottom>{"Created: " + this.formatTime(group.created)}</Typography>
                        {group.admin === user.name ? <Button variant="contained" color="primary" onClick={this.onDeleteGroup}>Delete Group</Button> : <div></div>}
                        <List>
                        {
                            tasks.map(this.renderListItems)
                        }
                        </List>
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
                    </CardContent>
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
        user: state.user,
        group: state.group,
        tasks: state.tasks.groupTasks
    }
}

export default withStyles(styles)(connect(mapStateToProps, { getGroup, getGroupTasks, addListItem, deleteGroup, getUser })(GroupTasks));
