import React, { Component } from 'react'
import { withStyles, Grow } from '../../node_modules/@material-ui/core';
import { Card, TextField, CardContent, Typography, Button } from '../../node_modules/@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../Redux/actions'


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
    }
})

class Register extends Component {

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
        this.props.registerUser(values, () => {
            this.setState({
                cardAnimation: false
            })
            setTimeout(() => {
                this.props.history.push("/tasks");
            }, 500)
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

    render() {
        const { classes } = this.props;
        const { cardAnimation } = this.state;
        return (
            <div className={classes.root}>
                <Grow in={cardAnimation}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="display3" component="h1">
                            Register
                            </Typography>
                            <form className={classes.container} noValidate onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                <Field name="username" label="Username" type="text" component={this.renderTextField} />
                                <Field name="email" label="Email" type="email" component={this.renderTextField} />
                                <Field name="password" label="Password" type="password" component={this.renderTextField} />
                                <Field name="password2" label="Repeat password" type="password" component={this.renderTextField} />
                                <Button
                                    className={classes.loginBTN}
                                    type="submit"
                                    variant="flat"
                                    color="secondary"
                                >
                                Register
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grow>
            </div>
        )
    }
}

const validate = ({ username, email, password, password2 }) => {
    const errors = {};

    if(!username){
        errors.username = "Enter a username!";
    }else if(username.length < 3){
        errors.username = "Username to short!"
    }

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
    
    if(!password2){
        errors.password2 = "Enter a password!";
    }else if(password2.length < 6){
        errors.password2 = "Passwort to short!"
    }

    if(password && password2 && password.length > 5 && password2.length > 5){
        if(String(password) !== String(password2)){
            errors.password2 = "Passwords don't match!";
        }
    }
    
    return errors;
}

function validateEmail(email) 
{
    var re = /\S+@\S+/;
    return re.test(email);
}


export default withStyles(styles)(reduxForm({
    form: "register",
    validate
})(
    connect(null, { registerUser })(Register)))
