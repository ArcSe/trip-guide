import React, {Component} from "react";
import EventAPI from "../util/EventAPI";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import ScheduleAPI from "../util/ScheduleAPI";
import DatePicker from "react-datepicker";


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

        this.handleCreateButton = this.handleCreateButton.bind(this);

    }


    handleCreateButton() {
        alert(this.props.eventId);
        const scheduleRequest = {eventId: this.props.eventId,
                                price: this.state.createData.price};

        ScheduleAPI.createSchedule(scheduleRequest)
            .then(response => {
                Alert.success("Расписание успешно добавлено!");

            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание события</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Введите стоимость</label>
                            <input type="text" className="form-control" id="textInput"
                                   onChange={e =>{let {createData} = this.state;
                                       createData.price = e.target.value;
                                       this.setState({createData})} }
                                   placeholder="Введите стоимость"/>
                            <label htmlFor="exampleInputEmail1">Выберете дату</label>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleCreateButton} >
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export class Schedule extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            createModal: false,
            createModalSchedule: false,
            schedule: {
                eventId: this.props.eventId,
                eventName: this.props.eventName,
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
        this.setState({createModalSchedule: !this.state.createModalSchedule});
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
            <div>
                <CreateModalDialog
                    toggleDialog={this.toggleCreateModal}
                    show = {this.state.createModalSchedule}
                    eventId = {this.props.eventId}
                />
                <div className="btn-group" >
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.toggleCreateModal}>Добавить</button>
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.props.toggleDialog}>Назад</button>
                </div>
                <div className="list-group">
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
                </div>

            </div>

        )
    }
}