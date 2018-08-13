import React, { Component } from 'react';
import { Card, Grow, CardContent, Typography, TextField, List, Divider, CardActions, Button, Fade } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getAllUser } from '../Redux/actions'
import UserListItem from './UserListItem';
import { createGroup, getUser } from '../Redux/actions'

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 700,
        margin: "50px auto"
    },
    searchField: {
        marginTop: 5,
        width: "100%"
    },
    nameField: {
        marginBottom: 20,
        width: "50%",
        margin: "0px auto"
    },
    dividerHeader: {
        margin: "10px 0"
    },
    createBTN: {
        margin: "20px auto"
    }
})

class CreateGroup extends Component {

    state = {
        cardAnimation: false,
        searchValue: '',
        selectedUser: [],
        groupName: '',
        error: false
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

    onInputChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
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

    createGroup = () => {
        const { groupName } = this.state;
        if(this.state.selectedUser.length > 0 && groupName !== ''){
            this.setState({error: false})
            const members = this.state.selectedUser.map(user => {
                return user.name;
            })
            this.props.createGroup(groupName, members, this.props.user.name, () => {
                this.props.getUser(this.props.user.id, () => {
                    this.props.history.push("/group");
                })
            })
        }else{
            this.setState({error: true})
        }
    }

    render() {
        const { classes, allUser } = this.props;
        const { cardAnimation, searchValue, selectedUser, groupName, error } = this.state;
        const filterUsers = allUser.filter(user => {
            return user.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) && !selectedUser.includes(user) && user.name !== this.props.user.name;
        })
        return (
            <div className={classes.root}>
                <Grow in={cardAnimation}>
                    <Card>
                        <CardContent>
                            <Typography variant="display3" gutterBottom>Create Group</Typography>

                            <TextField label="Group name" className={classes.nameField} value={groupName} onChange={this.onInputChange('groupName')} />

                            <Typography variant="headline">Choose members:</Typography>
                            <TextField
                                label="Search"
                                className={classes.searchField}
                                value={searchValue}
                                onChange={this.onInputChange('searchValue')}
                            />
                            <List>
                                { selectedUser.length > 0 ?
                                     <Typography variant="subheading" className={classes.dividerHeader}>Selected User</Typography>
                                     :
                                     <div></div>
                                }
                            {
                                selectedUser.map(this.renderUserList(true))
                            }
                                <Divider />
                                { filterUsers.length > 0 ?
                                     <Typography variant="subheading" className={classes.dividerHeader}>All User</Typography>
                                     :
                                     <div></div>
                                }
                            {
                                filterUsers.map(this.renderUserList(false))
                            }
                            </List>
                            <Fade in={error}>
                                <Typography variant="subheading" color="error">Fill out the name and select mebers!</Typography>
                            </Fade>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.createBTN} variant="outlined" onClick={this.createGroup}>Create Group</Button>
                        </CardActions>
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

export default withStyles(styles)(connect(mapStateToProps, { getAllUser, createGroup, getUser})(CreateGroup));;