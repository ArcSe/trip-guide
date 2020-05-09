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
            startDate: new Date(),
            price: null,
        };

        this.handleCreateButton = this.handleCreateButton.bind(this);
        this.setStartDate = this.setStartDate.bind(this);

    }

    setStartDate(date){
        this.setState({
            startDate: date
        });
    }


    handleCreateButton() {
        const scheduleRequest = {eventId: this.props.eventId,
            price: this.state.price,
            dateTime: this.state.startDate};

        ScheduleAPI.createSchedule(scheduleRequest)
            .then(() => {
                Alert.success("Расписание успешно добавлено!");
                this.props.toggleDialog();
                this.props.getSchedulesByEventsByEvent();
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
                                   onChange={e =>{let {price} = this.state;
                                       price = e.target.value;
                                       this.setState({price})} }
                                   placeholder="Введите стоимость"/>
                            <label htmlFor="exampleInputEmail1">Выберете дату</label>
                            <div></div>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={date => this.setStartDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d E, yyyy HH:mm"
                            />
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

class Content extends Component {
    constructor(props) {
        super(props);


        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleScheduleButton = this.handleScheduleButton.bind(this);

    }

    handleScheduleButton(eventId, eventName) {
        this.props.toggleScheduleDialog();
        this.props.setEventsState("editEventId", eventId);
        this.props.setEventsState("editEventName", eventName);
    }

    handleEditButton(eventId){
        this.props.toggleDialog();
        this.props.setEventsState("editEventId", eventId);
    }

    handleDeleteButton(scheduleId) {
        ScheduleAPI.deleteSchedule(scheduleId)
            .then(() => {
                Alert.success("Событие успешно удалено!");
                this.props.getSchedulesByEvent();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }


    render() {
        return(
            <div>
                <div className="btn-group" >
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.props.toggleCreateModal}>Добавить</button>
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.props.toggleDialog}>Назад</button>
                </div>
                <div className="list-group">
                    {
                        this.props.schedules.map(schedule =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{schedule.eventName}</p>
                                    <p className="mt-2 flex-grow-1">{schedule.price}</p>
                                    <p className="mt-2 flex-grow-1">{schedule.dateTime}</p>
                                    <div className="btn-group">
                                        <button type="button" className="mr-1 btn btn-outline-success"
                                        >Изменить
                                        </button>
                                        <button type="button" className="mr-1 btn btn-outline-danger"
                                                onClick={() => this.handleDeleteButton(schedule.id)} >Удалить
                                        </button>
                                    </div>
                                </li>
                            </div>)
                    }
                </div>

            </div>

        )
    }
}
class Pagination extends Component  {
    constructor(props) {
        super(props);

        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    handleBackButton() {
        const activePage = this.props.activePage;

        if (activePage !== 0) {
            this.props.setScheduleState("activePage", activePage - 1);
        }

        setTimeout(this.props.getSchedulesByEvent, 100);
    }

    handleNextButton() {
        const activePage = this.props.activePage;
        const totalPages = this.props.totalPages;

        if (activePage !== totalPages - 1) {
            this.props.setScheduleState("activePage", activePage + 1);
        }

        setTimeout(this.props.getSchedulesByEvent, 100);
    }

    render() {
        if (this.props.totalPages <= 1) {
            return null;
        }

        return(
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                        <button type="button" className="btn btn-light"
                                disabled={this.props.activePage === 0}
                                onClick={this.handleBackButton}>Предыдущая</button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="btn btn-light"
                                disabled={this.props.activePage === this.props.totalPages - 1}
                                onClick={this.handleNextButton}>Следующая</button>
                    </li>
                </ul>
            </nav>
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
            eventId: this.props.eventId,
            eventName: this.props.eventName,
            activePage: 0,
            totalPages: 0,
            pageSize: 5,
            schedules: [],
        }

        this.toggleScheduleModal = this.toggleScheduleModal.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.getSchedulesByEvent = this.getSchedulesByEvent.bind(this)
        this.setNewState = this.setNewState.bind(this);
    }


    componentDidMount() {
        this.getSchedulesByEvent();
    }

    setNewState(key, value) {
        this.setState({[key]: value});
    }

    getSchedulesByEvent() {
        ScheduleAPI.getSchedulesByEvent({page: this.state.activePage,
            size: this.state.pageSize, eventId: this.props.eventId})
            .then(response => {
                this.setState({totalPages: response.totalPages})
                this.setState({schedules: response.content});
            });

    }

    toggleCreateModal(){
        this.setState({createModalSchedule: !this.state.createModalSchedule});
    }

    toggleScheduleModal() {
        this.setState({show: !this.state.show});
    }

    render() {
        if (!this.state.schedules){
            return null;
        }
        return(
            <div>
                <CreateModalDialog
                    toggleDialog={this.toggleCreateModal}
                    show = {this.state.createModalSchedule}
                    eventId = {this.props.eventId}
                    getSchedulesByEvent = {this.getSchedulesByEvent}
                />
                <Content toggleDialog = {this.props.toggleDialog}
                         toggleCreateModal={this.toggleCreateModal}
                         setNewState={this.setNewState}
                         getSchedulesByEvent={this.getSchedulesByEvent}
                         schedules={this.state.schedules}
                         eventId={this.props.editEventId}
                         eventName={this.props.editEventName}
                />
                <Pagination totalPages={this.state.totalPages}
                            activePage={this.state.activePage}
                            setScheduleState={this.setNewState}
                            getSchedulesByEvent={this.getSchedulesByEvent}/>
            </div>

        )
    }

}