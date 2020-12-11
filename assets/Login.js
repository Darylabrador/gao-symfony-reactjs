import Axios from 'axios';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { setToken } from './services/tokenConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { flashError } from './services/flashMessage';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './Home';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            redirect: false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /**
     * Set email value in state
     * @param {*} event 
     */
    async handleChangeEmail(event) {
        await this.setState({ email: event.target.value });
    }


    /**
     * Set password value in state
     * @param {*} event 
     */
    async handleChangePassword(event) {
        await this.setState({ password: event.target.value });
    }


    /**
     * handle the submit form and log the user
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        const LoginData = await Axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        });
        let responseData = LoginData.data;
            if (responseData.success) {
            setToken(responseData.token);
            await this.setState({ redirect: true })
            await this.setState({ email: "", password: "" });
        } else {
            flashError(responseData.message)
        }
    }


    /**
    * Render the login component
    */
    render() {
        if (this.state.redirect) {
            return (
                <React.Fragment>
                    <Router>
                        <Route exact path="/" >
                            <Home />
                        </Route>
                        <Redirect to='/' />
                    </Router>
                </React.Fragment>
            )
        } else {
            return (
                <div className="loginContainer">
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <form onSubmit={this.handleSubmit} className="loginForm">
                        <h3 className="whiteFont"> Bienvenue sur l'espace culturel </h3>
                        <TextField type="email" label="Adresse email" value={this.state.email} onChange={this.handleChangeEmail} className="loginInput" />
                        <TextField type="password" label="Mot de passe" value={this.state.password} onChange={this.handleChangePassword} className="loginInput" />
                        <div className="btnLoginContainer">
                            <Button type="submit" variant="contained" color="primary" size="small" className="btnLogin"> Se connecter</Button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}