import React, { Component } from 'react';
import { Card, Grow, CardContent, Typography, TextField, List, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getAllUser } from '../Redux/actions'
import UserListItem from './UserListItem';

const styles = theme => ({
    root: {
        width: "90%",
        maxWidth: 700,
        margin: "50px auto"
    },
    searchField: {
        marginTop: 10,
        width: "100%"
    },
    dividerHeader: {
        margin: "10px 0"
    }
})

class CreateGroup extends Component {

    state = {
        cardAnimation: false,
        searchValue: '',
        selectedUser: []
    }

    componentDidMount(){
    
        if(!this.props.user.id){
            this.props.history.push('/')
            return;
        }
        
        this.props.getAllUser(() => {
            this.setState({userList: this.props.allUser})
        });

        this.setState({
            cardAnimation: true
        })
    }

    onSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        })
        
    }

    renderUserList = (checked) => (user) => {
        return <UserListItem user={user} key={user.id} checked={checked} onSelectUser={this.onSelectUser} onUnSelectUser={this.onUnSelectUser}/>
    }

    onSelectUser = (user) => {
        this.setState({
            selectedUser: [...this.state.selectedUser, user]
        })
    }

    onUnSelectUser = (user) => {
        const newArray = this.state.selectedUser.filter(userName => {
            return userName !== user;
        })
        this.setState({
            selectedUser: newArray
        })
    }

    render() {
        const { classes, allUser } = this.props;
        const { cardAnimation, searchValue, selectedUser } = this.state;
        const filterUsers = allUser.filter(user => {
            return user.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) && !selectedUser.includes(user);
        })
        return (
            <div className={classes.root}>
                <Grow in={cardAnimation}>
                    <Card>
                        <CardContent>
                            <Typography variant="display3" component="h1">Create Group</Typography>
                            <Typography variant="title" component="h2">Choose user:</Typography>
                            <TextField
                                label="Search"
                                className={classes.searchField}
                                value={searchValue}
                                onChange={this.onSearchChange}
                            />
                            <List>
                                { selectedUser.length > 0 ?
                                     <Typography variant="subheading" component="p" className={classes.dividerHeader}>Selected User</Typography>
                                     :
                                     <div></div>
                                }
                            {
                                selectedUser.map(this.renderUserList(true))
                            }
                                <Divider />
                                { filterUsers.length > 0 ?
                                     <Typography variant="subheading" component="p" className={classes.dividerHeader}>All User</Typography>
                                     :
                                     <div></div>
                                }
                            {
                                filterUsers.map(this.renderUserList(false))
                            }
                            </List>
                        </CardContent>
                    </Card>
                </Grow>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        allUser: state.allUser
    }
}

export default withStyles(styles)(connect(mapStateToProps, { getAllUser })(CreateGroup));;