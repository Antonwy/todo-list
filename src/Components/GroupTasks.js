import React, { Component } from 'react';
import { Card, Grow, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        width: "90%",
        maxWidth: 700,
        margin: "50px auto"
    },
})

class GroupTasks extends Component {

    state = {
        cardAnimation: false
    }

    componentDidMount(){

        if(!this.props.user.id){
            this.props.history.push('/')
        }else if(!this.props.user.group){
            this.props.history.push('/createGroup')
        }
        
        this.setState({
            cardAnimation: true
        })
    }

    render() {
        const { classes } = this.props;
        const { cardAnimation } = this.state;
        return (
        <div className={classes.root}>
            <Grow in={cardAnimation}>
                <Card>
                    <CardContent>
                        <Typography variant="display3" component="h1">Group</Typography>
                    </CardContent>
                </Card>
            </Grow>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default withStyles(styles)(connect(mapStateToProps)(GroupTasks));
