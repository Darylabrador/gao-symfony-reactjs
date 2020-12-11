import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import SuppOrdiModal from './modalSuppOrdi';
import SuppAttributionModal from './modalSuppAttribution';
import AjoutAttributionModal from './modalAjoutAttribution';
import ModifOrdiModal from './modalModifOrdi';

export default class OrdinateurCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributions: {},
            timeslots: [],
            date: this.props.date
        }
        this.getDeleteOrdi     = this.getDeleteOrdi.bind(this);
        this.getSupAttribution = this.getSupAttribution.bind(this);
        this.getAddAttributions = this.getAddAttributions.bind(this);
        this.updateOrdi         = this.updateOrdi.bind(this);
    }


    componentDidMount() {
        this.initialize()
        this.displayHoraire()
    }

    
    /**
     * Create assign array (associative array)
     */
    initialize() {
        var attributionInfo = this.props.ordinateur.attributions;
        if (attributionInfo.length != 0) {
            attributionInfo.forEach(element => {
                this.state.attributions[element.hours] ={
                    id: element.client.id,
                    surname: element.client.surname,
                    name: element.client.name,
                    idAssign: element.idAssign
                }
            })
        }
    }


    /**
     * Create timeslot array
     */
    async displayHoraire() {
        await this.setState({timeslots: []});
        let arrayData = {};
        let arrayDataFormatted = [];

        for (let i = 8; i < 19; i++) {
            if (this.state.attributions[i]) {
                arrayData = {
                    hours: i,
                    client: this.state.attributions[i],
                }
                arrayDataFormatted.push(arrayData)
            } else {
                arrayData = {
                    hours: i,
                    client: ''
                }
                arrayDataFormatted.push(arrayData)
            }
        }
        await this.setState({timeslots: arrayDataFormatted})
    }


    /**
     * Refresh assign array with deleted assign information
     * @param {*} idAssign 
     */
    async getSupAttribution(idAssign){
        await this.setState({ attributions: {}});
        const refreshDeleteData = this.state.timeslots.filter(element => element.client.idAssign != idAssign);
        refreshDeleteData.forEach(element => {
            if (element.client.id) {
                this.state.attributions[element.hours] = {
                    id: element.client.id,
                    surname: element.client.surname,
                    name: element.client.name,
                    idAssign: element.client.idAssign
                }
            }
        });
        this.displayHoraire();
    }


    /**
     * Create assign array
     * @param {*} attributions 
     */
    async getAddAttributions(attributions) {
        if (attributions) {
            this.state.attributions[attributions.hours] = {
                id: attributions.client.id,
                surname: attributions.client.surname,
                name: attributions.client.name,
                idAssign: attributions.idAssign
            }
            await this.initialize()
            await this.displayHoraire()
        }
    }


    /**
     * Send deleted desktop information to parent component (home)
     * @param {*} childData 
     */
    getDeleteOrdi(childData) {
        if (childData) {
            this.props.deleteOrdi(childData);
        }
    }

    updateOrdi() {
        this.props.updateOrdi();
    }
    /**
     * Render ordinateur component
     */
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardContent>
                        <div className="ordinateurHeader">
                            <div>
                                <Typography color="initial">
                                    {this.props.ordinateur.name}
                                </Typography>
                            </div>
                            <div className="flexButton">
                                <ModifOrdiModal idOrdi={this.props.ordinateur.id} updateOrdi={this.updateOrdi} />
                                <SuppOrdiModal suppOrdi={this.getDeleteOrdi} idOrdi={this.props.ordinateur.id}  />
                            </div>
                        </div>

                        <TableContainer>
                            <Table size="small">
                                <TableBody>
                                    {this.state.timeslots.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell size="small" component="th" scope="row">{data.hours}h</TableCell>
                                            <TableCell align="center"> {data.client.name} {data.client.surname} </TableCell>
                                            <TableCell align="right">
                                                <Button>
                                               { data.client != ""
                                                        ? <SuppAttributionModal suppAttribution={this.getSupAttribution} idAssign={data.client.idAssign} />
                                                        : <AjoutAttributionModal desktop_id={this.props.ordinateur.id} hours={data.hours} date={this.state.date} getAddAttributions={this.getAddAttributions} />
                                               }
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}