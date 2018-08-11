import React, { Component } from 'react'
import { withStyles } from '../../node_modules/@material-ui/core';
import { Card, TextField, CardContent, CardActions, Typography, Button } from '../../node_modules/@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../Redux/actions'


const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        margin: "50px auto"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "column",
        alignItems: "center",
    },
    card: {
        display: "table",
        margin: "0 auto"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: 10,
        width: 300,
    },
    loginBTN: {
        marginTop: 15
    }
})

class Register extends Component {

    handleSubmit = (values) => {
        this.props.registerUser(values, () => {
            this.props.history.push("/");
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
            floatingLabelText={label}
            error={touched && error ? true : false}
            {...input}
        />
    )

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h1">
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
                                variant="contained"
                                color="primary"
                            >
                            Register
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const validate = ({ username, email, password, password2 }) => {
    const errors = {};

    if(!username){
        errors.email = "Enter a username!";
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
