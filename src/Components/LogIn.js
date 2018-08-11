import React from 'react'
import { Card, TextField, CardContent, Typography, Button } from '../../node_modules/@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../Redux/actions'

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

class LogIn extends React.Component {

    handleSubmit = (values) => {
        this.props.loginUser(values, () => {
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
            error={touched && error}
            {...input}
        />
    )

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
              <Card className={classes.card}>
                <CardContent>
                     <Typography gutterBottom variant="headline" component="h1">
                        Login
                    </Typography>
                    <form className={classes.container} noValidate onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field name="email" label="Email" type="email" component={this.renderTextField} />
                        <Field name="password" label="Password" type="password" component={this.renderTextField} />
                        <Button
                            className={classes.loginBTN}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                        Login
                        </Button>
                    </form>
                </CardContent>
              </Card>
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
