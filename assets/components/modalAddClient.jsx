import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import { getToken } from '../services/tokenConfig';
import { flashSuccess, flashError } from '../services/flashMessage';

export default class AjoutClientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            desktop_id: this.props.desktop_id,
            hours: this.props.hours,
            date: this.props.date,
            open: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * handle the update value for name state
     * @param {*} event 
     */
    async handleChangeName(event) {
        await this.setState({ name: event.target.value });
    }


    /**
     * handle the update value for surname state
     * @param {*} event 
     */
    async handleChangeSurname(event) {
        await this.setState({ surname: event.target.value });
    }


    /**
     * handle add client and set assign at same time
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        try {
            const createClientData = await Axios.post(`/api/client/attributions`,
                {
                    name: this.state.name,
                    surname: this.state.surname,
                    desktop_id: this.state.desktop_id,
                    hours: this.state.hours,
                    date: this.state.date
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            )
            let responseData = createClientData.data;
            if (responseData.success) {
                let assignInfo = responseData.message;
                await this.props.getInfoAttribution(assignInfo);
                await this.setState({ name: "", surname: "", open: false });
                await this.props.closeModal();
            } else {
                flashError(responseData.message);
                await this.props.closeModal();
            }
        } catch (error) {
            console.error(error);
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
        await this.props.closeModal();
    };


    /**
     * render add client modal
     */
    render() {
        return (
            <div>
                <Button type="button" variant="contained" size="small" className="btnStyle" onClick={this.handleOpen} >
                    <AddCircleOutlineIcon size="small" className="greenFont" />
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyleClient"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Ajouter un client</h3>
                        <div className="formInput">
                            <input type="text" placeholder="Nom du client" value={this.state.name} onChange={this.handleChangeName} />
                            <input type="text" placeholder="Prénom du client" value={this.state.surname} onChange={this.handleChangeSurname} />
                            <div className="btnSpaceTop">
                                <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                <Button type="submit" variant="contained" color="primary" className="btnSpace">Ajouter</Button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}