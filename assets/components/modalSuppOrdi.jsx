import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { getToken } from '../services/tokenConfig';
import { flashSuccess } from '../services/flashMessage';


export default class SuppOrdiModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idOrdi: this.props.idOrdi,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    
    /**
     * Handle deleted desktop in database
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const deleteOrdiData = await Axios.delete(`/api/computers/${this.state.idOrdi}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })

            let responseData = deleteOrdiData.data;

            if(responseData.success) {
                flashSuccess(responseData.message)
                this.props.suppOrdi(true);
                this.handleClose();
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
     * render modal delete desktop
     */
    render() {

        return (
            <div>
                <Button>
                    <DeleteIcon className="redFont" onClick={this.handleOpen} />
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Voulez vous vraiment supprimer ce poste ?</h3>
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