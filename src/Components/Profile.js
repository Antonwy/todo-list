import React, { Component } from 'react'
import { Typography, Card } from '../../node_modules/@material-ui/core';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'



class Profile extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card>
                    <Typography gutterBottom variant="headline" component="h1">{this.props.user.name}</Typography>
                </Card>
            </div>
        )
  }
}

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
})

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));