import React, {Component} from "react";
import EventAPI from "../util/EventAPI";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

export class Schedule extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            name:null,
            price: null,
            date: null,
        }
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.toggleScheduleModal = this.toggleScheduleModal.bind(this);
    }

    toggleScheduleModal() {
        this.setState({showScheduleModal: !this.state.showScheduleModal});
    }

    handleEditButton(eventId){
        this.props.toggleDialog();
        this.props.setEventsState("editEventId", eventId);
    }

    handleDeleteButton(eventId) {
        EventAPI.deleteEvent(eventId)
            .then(() => {
                Alert.success("Событие успешно удалено!");
                this.props.getEvents();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }


    render() {
        return(
            <Modal size="xl" show={this.state.show} onHide={this.toggleScheduleModal}
                   aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-xl">Расписание</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <button type="button" className="mb-2 btn btn-outline-dark">Добавить</button>
                    <div className="list-group">
                        <div>
                            <li className="mb-1 list-group-item d-flex justify-content-between">
                                <p className="mt-2 flex-grow-1">Расписание</p>
                                <div className="btn-group" >
                                    <button type="button" className="mr-1 btn btn-outline-success"
                                    >Изменить</button>
                                    <button type="button" className="mr-1 btn btn-outline-danger"
                                    >Удалить</button>
                                </div>
                            </li>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}