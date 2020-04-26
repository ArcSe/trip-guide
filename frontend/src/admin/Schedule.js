import React, {Component} from "react";
import EventAPI from "../util/EventAPI";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";


class CreateModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createData: {
                idEvent: null,
                price: null,
                date: null,
            }
        };

    }



    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание события</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Закрыть
                    </Button>
                    <Button variant="primary"  >
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <button type="button" className="mb-2 btn btn-outline-dark"
                        onClick={this.props.toggleCreateDialog}>Добавить</button>
            </div>
        )
    }
}

export class Schedule extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            createModal: false,
            schedule: {
                idEvent: this.props.eventId,
                nameEvent: this.props.eventName,
                price: null,
                date: null,
            }
        }
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.toggleScheduleModal = this.toggleScheduleModal.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
    }

    toggleCreateModal(){
        alert(this.state.createModal);
        this.setState({createModal: !this.state.createModal});
        alert(this.state.createModal);
    }

    toggleScheduleModal() {
        this.setState({show: !this.state.show});

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
                    <Modal.Title id="example-modal-sizes-title-xl">Расписание {this.state.schedule.nameEvent}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <button type="button" className="mb-2 btn btn-outline-dark"
                                onClick={this.toggleCreateModal}>Добавить</button>
                        <CreateModalDialog toggleDialog={this.toggleCreateModal} show = {this.state.createModal}/>
                    </div>


                    <div className="list-group">
                        {

                                <div>
                                    <li className="mb-1 list-group-item d-flex justify-content-between">
                                        <p className="mt-2 flex-grow-1">event</p>
                                        <div className="btn-group" >
                                            <button type="button" className="mr-1 btn btn-outline-success"
                                            >Изменить</button>
                                            <button type="button" className="mr-1 btn btn-outline-danger"
                                            >Удалить</button>
                                        </div>
                                    </li>
                                </div>
                        }
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