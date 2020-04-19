import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import Header from '../../common/header/Header';
import './Login.css'

const styles = {
    card: {
        padding: '15px',
        position: 'relative',
        top: '90px',
        left: '50%',
        width: '325px',
        transform: 'translateX(-50%)',
    },
    title: {
        fontSize: 20
    }
};

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            usernameRequired: "disp-none",
            password: "",
            passwordRequired: "disp-none",
            incorrectUsernamePassword: "disp-none",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
        };
    }

    // When Login button is clicked, checking for username and password and logging in
    loginClickHandler = () => {
        this.setState({ incorrectUsernamePassword: "disp-none" });
        this.state.username === "" ? this.setState({ usernameRequired: "disp-block" }) : this.setState({ usernameRequired: "disp-none" });
        this.state.password === "" ? this.setState({ passwordRequired: "disp-block" }) : this.setState({ passwordRequired: "disp-none" });

        if (this.state.username === "" || this.state.password === "") { return }

        if (this.state.username === "admin" && this.state.password === "1234") {
            sessionStorage.setItem('username', 'admin');
            sessionStorage.setItem('access-token', '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
            this.setState({ loggedIn: true });
            this.navigateToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "disp-block" });
        }
    }

    // Navigating to home page after login
    navigateToHome = () => {
        this.props.history.push('/home');
    }

    // When username field value is changed
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    // When password field value is changed
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div className="main-container">
                <Header
                    screen={"Login"} />
                <Card style={styles.card}>
                    <CardContent>
                        <Typography style={styles.title}> LOGIN </Typography><br />
                        <FormControl required style={{ width: '100%' }}>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <FormControl required style={{ width: '100%' }}>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.inputPasswordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                        </FormControl><br /><br />
                        <div className={this.state.incorrectUsernamePassword}><span className="red"> Incorrect username and/or password </span></div><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}> LOGIN </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;
