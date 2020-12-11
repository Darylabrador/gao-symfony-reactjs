import Axios from 'axios';
import React, { Component } from 'react';
import Ordinateur from './components/Ordinateur';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import AjoutOrdinateurModal from './components/modalAjoutOrdi';

import { getToken, removeToken } from './services/tokenConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordinateurs: [],
            currentDate: new Date().toISOString().substr(0, 10),
            currentPage: 1,
            paginationLink: {},
            totalPage: null,
            redirect: false
        }

        /**
         * Put the 'this' in the function context
         */
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.getAddOrdi       = this.getAddOrdi.bind(this);
        this.getDeleteOrdi    = this.getDeleteOrdi.bind(this);
        this.updateOrdi       = this.updateOrdi.bind(this);
        this.logout = this.logout.bind(this);
    }


    /**
     * At the start, get all data
     */
    async componentDidMount() {
        await this.getAttribution();
    }


    /**
     * Function to get all data needed
     */
    async getAttribution() {
        try {
            await this.setState({ ordinateurs: [] });
            await this.setState({ paginationLink: {} });
            await this.setState({ totalPage: null });

            const allInformation = await Axios.get('/api/computers', {
                params: {
                    date: this.state.currentDate,
                    page: this.state.currentPage
                },
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const responseData = allInformation.data;
            let now = Math.ceil(responseData.meta.total / 3);
            await this.setState({ ordinateurs: responseData.data });
            await this.setState({ paginationLink: responseData.links });
            await this.setState({ totalPage: now });
        } catch (error) {
            console.error(error)
        } 
    }


    /**
     * Handle the page change
     * @param {*} event 
     * @param {*} value 
     */
    async handleChangePage(event, value){
        await this.setState({ currentPage: value });
        await this.getAttribution();
    }


    /**
     * Handle the date change
     * @param {*} event 
     * @param {*} value 
     */
    async handleDateChange(event, value){
        await this.setState({ currentDate: value });
        await this.getAttribution();
    }


    /**
     * handle added desktop information
     * @param {*} childData 
     */
    async getAddOrdi(childData) {
        if(childData) {
            await this.getAttribution();
        }
    }


    /**
     * handle deleted desktop information
     * @param {*} childData 
     */
    async getDeleteOrdi(childData) {
        if (childData) {
           await this.getAttribution();
        }
    }


    /**
    * handle update desktop information
    * @param {*} childData 
    */
    async updateOrdi() {
        await this.getAttribution();
    }


    /**
     * handle the user's logout
     */
    async logout() {
        removeToken();
        await this.setState({ redirect: true })
    }
    
    
    /**
     * Render the home component
     */
    render() {
        if (this.state.redirect) {
            return (
                <React.Fragment>
                    <Router>
                        <Route exact path="/" >
                            <Login />
                        </Route>
                        <Redirect to='/' />
                    </Router>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Router>
                        <header>
                            <Link to="/" id="btnWelcome" className="whiteFont">  Gestion ordinateur </Link>
                            <Button onClick={this.logout}>
                                <ExitToAppIcon className="whiteFont" />
                            </Button>
                        </header>
                    </Router>

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

                    <div className="marginDate alignElement">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="date-picker-inline"
                                value={this.state.currentDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <AjoutOrdinateurModal ajoutOrdi={this.getAddOrdi} />
                    </div>


                    <div className="pagination">
                        <Pagination count={this.state.totalPage} size="small" onChange={this.handleChangePage} />
                    </div>

                    <Grid container spacing={3} justify="space-around" id="cardContainer">
                        {this.state.ordinateurs.map((ordi, index) => (
                            <Grid item xs={12} sm={3} key={ordi.id}>
                                <Ordinateur key={index} ordinateur={ordi} deleteOrdi={this.getDeleteOrdi} date={this.state.currentDate} updateOrdi={this.updateOrdi} />
                            </Grid>
                        ))}
                    </Grid>

                </React.Fragment>
            )
        }
    }
}