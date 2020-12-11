import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import { getToken } from '../services/tokenConfig';

export default class Navigation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            token: getToken()
        }
    }

    render() {
        let routes;
        if (this.state.token){
            routes = (<Home />);
        } else {
            routes = (<Login />);
        }

        return(
            <React.Fragment>
                <Router>
                    <Route exact path="/" > 
                        {routes}
                    </Route>  
                    <Route exact path="/login" >
                        {routes}
                    </Route>              
                </Router>
            </React.Fragment>
        )
    }
}