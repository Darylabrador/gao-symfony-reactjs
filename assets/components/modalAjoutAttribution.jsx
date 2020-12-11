import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AjoutClientModal from './modalAddClient';
import { getToken } from '../services/tokenConfig';
import { flashSuccess, flashError} from '../services/flashMessage';

export default class AjoutAttributionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desktop_id: this.props.desktop_id,
            client_id: null,
            hours: this.props.hours,
            date: this.props.date,
            attributeInfo: {},
            userExist: false,
            defaultProps: {
                options: [],
                getOptionLabel: (option) => `${option.name} ${option.surname}`,
            },
            open: false,
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getInfoAttributionClient = this.getInfoAttributionClient.bind(this);
    }


    /**
     * create object array for autocomplete
     * @param {*} event 
     * @param {*} value 
     */
    async handleChange(event, value) {
        let client       = event.target.value;
        let clientLength = client.length;
        if(clientLength > 2) {

            try {
                const clientData = await Axios.post('/api/client/search', { clientInfo: client }, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                });

                const responseData = clientData.data.data;
                let userLength = responseData.length;

                if (userLength == 0) {
                    await this.setState({ userExist: false, defaultProps: { ...this.state.defaultProps, options: responseData } });
                } else {
                    await this.setState({ userExist: true, defaultProps: { ...this.state.defaultProps, options: responseData } });
                }
            } catch (error) {
                console.error(error)
            }
        
        }   else {
            await this.setState({ userExist: false });
        }
    }


    /**
     * Set an assign information
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const attributionData = await Axios.post('/api/computers/attributions', {
                desktop_id: this.state.desktop_id,
                client_id: this.state.attributeInfo.id,
                hours: this.state.hours,
                date: this.state.date
            },{
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })

            const attributionDataSend = attributionData.data.data;
            await this.props.getAddAttributions(attributionDataSend);
            flashSuccess("Créneau réserver !")
            this.handleClose();
            
        } catch (error) {
            console.error(error)
        }
    }


    /**
     * handle open modal
     */
    async handleOpen() {
        await this.setState({ open: true })
    };


    /**
     * handle close modal
     * @param {*} close 
     */
    async handleClose(close) {
        await this.setState({ open: false })
    };


    /**
     * Handle selected object value
     * @param {*} event 
     * @param {*} value 
     */
    async handleSelect(event, value) {
        await this.setState({ attributeInfo: value });
    }


    /**
     * handle create client and his assign
     * @param {*} infoAssign 
     */
    async getInfoAttributionClient(infoAssign) {
        await this.props.getAddAttributions(infoAssign);
    }


    /**
     * render the assign modal
     */
    render() {
        let buttonAttribution;
        if(this.state.userExist) {
            buttonAttribution = (
                <Button type="submit" variant="contained" color="primary" className="btnSpace">Attribuer</Button>
            );
        } else {
            buttonAttribution=(
                <Button type="submit" variant="contained" color="primary" className="btnSpace" disabled>Attribuer</Button>
            );
        }

        return (
            <div>
                <AddCircleOutlineIcon size="small" className="greenFont btnStyle" onClick={this.handleOpen} />

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >

                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Attribuer</h3>
                        <div className="formInput">
                            <div className="formAutocomplete">
                                <Autocomplete
                                    className="autoCompleteStyle"
                                    {...this.state.defaultProps}
                                    id="auto-complete"
                                    autoComplete
                                    includeInputInList
                                    onKeyUp={this.handleChange}
                                    onChange={this.handleSelect}
                                    renderInput={(params) => <TextField {...params} label="Le client" margin="normal" />}
                                />
                                <AjoutClientModal desktop_id={this.state.desktop_id} hours={this.state.hours} date={this.state.date} closeModal={this.handleClose} getInfoAttribution={this.getInfoAttributionClient} />
                            </div>
                            <div>
                                <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                {buttonAttribution}
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}