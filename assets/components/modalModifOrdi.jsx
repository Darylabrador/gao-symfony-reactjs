import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { getToken } from '../services/tokenConfig';
import { flashSuccess, flashError } from '../services/flashMessage';

export default class ModifOrdiModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            idOrdi: this.props.idOrdi,
            open: false,
            disabledBtn: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * Handle the change on name input
     * @param {*} event 
     */
    async handleChange(event) {
        if (event.target.value.length > 3) {
            await this.setState({ name: event.target.value, disabledBtn: false });
        } else {
            await this.setState({ name: event.target.value, disabledBtn: true });
        }
    }


    /**
     * handle the create desktop information
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        try {
            let dataSend = {
                name: this.state.name,

            };

            const ordiData = await Axios.put(`/api/computers/${this.state.idOrdi}`, dataSend, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            let responseData = ordiData.data;
            if (responseData.success) {
                this.props.updateOrdi();
                await this.setState({ name: "" });
                flashSuccess(responseData.message)
                this.handleClose();
            } else {
                flashError(responseData.message)
            }

        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Handle open modal
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
     * render add desktop modal
     */
    render() {
        let buttonSubmit;
        if (this.state.disabledBtn) {
            buttonSubmit = (<Button type="submit" variant="contained" color="primary" className="btnSpace" disabled>Modifier</Button>);
        } else {
            buttonSubmit = (<Button type="submit" variant="contained" color="primary" className="btnSpace">Modifier</Button>);
        }

        return (
            <div>
                <Button>
                    <CreateIcon onClick={this.handleOpen} />
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Modifier l'ordinateur</h3>
                        <div className="formInput">
                            <input type="text" value={this.state.name} onChange={this.handleChange} />
                            <div>
                                <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                {buttonSubmit}
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}