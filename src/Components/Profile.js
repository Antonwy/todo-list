import React, { Component } from 'react'
import { Typography, Card, CardContent, Avatar, List, Button } from '../../node_modules/@material-ui/core';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import deepOrange from '@material-ui/core/colors/deepOrange';
import TodoListItem from './TodoListItem';
import { logoutUser, getPrivateTasks } from '../Redux/actions'



class Profile extends Component {

    componentDidMount(){
        this.props.getPrivateTasks(this.props.user.name)
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
        const { taskList } = this.props;

        return (i === taskList.length -1 ?
        <TodoListItem newOne={true} checked={value.checked} text={value.todo} id={value.id} key={value.id} name={value.name}/>
        : <TodoListItem newOne={false} checked={value.checked} text={value.todo} id={value.id} key={value.id} name={value.name}/>)
    }

    logout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user, taskList } = this.props;

        if(!this.props.user.id){
            this.props.history.push('/')
            return <div></div>
        }

        return (
            <div className={classes.root}>
                <Card>
                    <CardContent style={{textAlign: "center"}}>
                        <Avatar className={classes.orangeAvatar} component={Link} to="/profile">{user.name.charAt(0).toUpperCase()}</Avatar>
                        <Typography gutterBottom variant="headline" component="h1">{user.name}</Typography>
                        <Typography component="p">{"Joined: " + this.formatTime(user.joined)}</Typography>
                        <Button className={classes.logout} variant="outlined" component={Link} to="/" onClick={this.logout} color="secondary">Logout</Button>
                    </CardContent>
                </Card>
                <Card className={classes.myTodosCard}>
                    <CardContent>
                        <Typography variant="headline" component="h1">Private todos:</Typography>
                    </CardContent>
                    <List className={classes.todoList}>
                        {
                            taskList.length < 1 ? <Typography gutterBottom variant="subheading" component="p">No private tasks!</Typography> : taskList.map(this.renderListItems)
                        }
                    </List>
                </Card>
            </div>
        )
  }
}

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 700,
        margin: "50px auto",
      },
      orangeAvatar: {
        color: '#fff',
        backgroundColor: deepOrange[500],
        textDecoration: "none",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
        width: 100,
        height: 100,
        fontSize: "3em"
      },
      name: {
          marginTop: 20,
          fontSize: "3em",
      },
      myTodosCard: {
          marginTop: 20
      },
      todoList: {
          margin: 20
      },
      logout: {
        marginTop: 20
      }
})

const mapStateToProps = state => {
    return{
        user: state.user,
        taskList: state.tasks.private
    }
}

export default connect(mapStateToProps, { logoutUser, getPrivateTasks })(withStyles(styles)(Profile));