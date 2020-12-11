import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { getToken } from '../services/tokenConfig';
import { flashSuccess } from '../services/flashMessage';

export default class SuppAttributionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idAssign: this.props.idAssign,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * Handle deleted assign information in database
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const assignData = await Axios.delete(`/api/computers/attributions/${this.state.idAssign}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            let responseData = assignData.data;
            if(responseData.success) {
                await this.props.suppAttribution(this.state.idAssign);
                flashSuccess(responseData.message);
                await this.handleClose();
            }
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
     */
    async handleClose() {
        await this.setState({ open: false })
    };


    /**
     * render delete assign information
     */
    render() {
        return (
            <div>
                <DeleteIcon size="small" className="redFont btnStyle" onClick={this.handleOpen} />

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Voulez vous vraiment annuler cette attribution ?</h3>
                        <div className="formInput">
                            <div>
                                <Button variant="contained" color="primary" onClick={this.handleClose} className="btnSpace">Non</Button>
                                <Button type="submit" variant="contained" color="secondary" className="btnSpace">Oui</Button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}