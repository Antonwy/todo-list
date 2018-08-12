import React from 'react'
import { Card, TextField, CardContent, Typography, Button, Fade, Grow } from '../../node_modules/@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../Redux/actions'

const styles = theme => ({
    root: {
        width: "100%",
        margin: "50px auto",
        maxWidth: 400
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "column",
        alignItems: "center",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: 10,
        width: "100%",
    },
    loginBTN: {
        marginTop: 15
    },
    errorText: {
        color: "red",
        textAlign: "center"
    }
})

class LogIn extends React.Component {

    state = {
        error: false,
        cardAnimation: false
    }

    componentDidMount(){  
        this.setState({
            cardAnimation: true
        })
    }

    handleSubmit = (values) => {
        this.props.loginUser(values, (res) => {
            if(res){
                console.log(res)
                this.setState({error: true})
            }else{
                this.setState({
                    cardAnimation: false
                })
                setTimeout(() => {
                    this.props.history.push("/tasks");
                }, 500)
                
            }
        })
    }

    renderTextField = ({
        input,
        label,
        type,
        meta: { touched, error }
      }) => (
        <TextField
            className={this.props.classes.textField}
            label={touched && error ? error : label}
            type={type}
            error={touched && error ? true : false}
            {...input}
        />
    )

    render(){
        const { classes } = this.props;
        const { error, cardAnimation } = this.state;
        return (
            <div className={classes.root}>
                <Grow in={cardAnimation}>
                    <div>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography gutterBottom variant="display3" component="h1">
                                    Login
                                </Typography>
                                <Fade in={error}>
                                    <Typography className={classes.errorText} gutterBottom variant="subheading" component="p">Wrong credientials!</Typography>
                                </Fade>
                                <form className={classes.container} noValidate onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                    <Field name="email" label="Email" type="email" component={this.renderTextField} />
                                    <Field name="password" label="Password" type="password" component={this.renderTextField} />
                                    <Button
                                        className={classes.loginBTN}
                                        type="submit"
                                        variant="flat"
                                        color="secondary"
                                    >
                                    Login
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </Grow>
            </div>
        )
    }
}

const validate = ({ email, password }) => {
    const errors = {};

    if(!email){
        errors.email = "Enter a email!";
    }else if(!validateEmail(email)){
        errors.email = "Type in a valid email address!"
    }
    if(!password){
        errors.password = "Enter a password!";
    }else if(password.length < 6){
        errors.password = "Passwort to short!"
    }
    
    return errors;
}

function validateEmail(email) 
{
    var re = /\S+@\S+/;
    return re.test(email);
}


export default withStyles(styles)(reduxForm({
    form: "login",
    validate
})(
    connect(null, { loginUser })(LogIn)))
