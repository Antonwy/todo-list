import React from 'react'
import { withStyles, Typography, Button, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ColorChooser from './ColorChooser';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 700,
        margin: "50px auto",
    },
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: 30
    },
    chooseBTN: {
        marginLeft: 20
    }
})



class Settings extends React.Component {

    state = {
        colorType: 'primary',
        dialogOpen: false
    }

    handleClick = (colorType) => (event) => {
        event.preventDefault();
        this.setState({
            colorType: colorType,
            dialogOpen: true
        })
    }

    handleClose = () => {
        this.setState({dialogOpen: false})
    }

    render(){
        const { classes } = this.props;
        const { dialogOpen, colorType } = this.state;
        return (
            <div className={classes.root}>
                <ColorChooser open={dialogOpen} colorType={colorType} handleClose={this.handleClose}/>
                <Card>
                    <CardContent>
                        <Typography gutterBottom  variant="display3">Settings</Typography>
                        <div className={classes.flex}>
                            <Typography variant="subheading">Primary color: </Typography>
                            <Button variant="contained" component={Link} to="/" color="primary" className={classes.chooseBTN} onClick={this.handleClick("primary")}>Choose</Button>
                        </div>
                        <div className={classes.flex}>
                            <Typography variant="subheading">Secondary color</Typography>
                            <Button variant="contained" component={Link} to="/" color="secondary" className={classes.chooseBTN} onClick={this.handleClick("secondary")}>Choose</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
}



export default withStyles(styles)(Settings)
