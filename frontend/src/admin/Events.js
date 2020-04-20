import React, {Component} from "react";
import {getAllEvents, deleteEvent, editCities} from "../util/APIUtils";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";


export class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            showModal: false,
            newEventData: null,
            showEditModal: false,
            editEventData: {
                id: '',
                name: '',
                rating: '',
                address: '',
                city: {
                    id: '',
                    name: '',
                },
                price: '',
                category: {
                    id: '',
                    name: '',
                },
            },
            search: '',
            activePage: 0,
            pageSize: 5,
        };

        this.getEvents = this.getEvents.bind(this);
        this.changeEditModal = this.changeEditModal.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        getAllEvents({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages})
                this.setState({events: response.content});
            });
    }

    updateEvent(){
        this.setState({showModal: !this.state.showModal});
    }

    editEvent(id,name,address,rating, price, city, category){
        this.setState({editEventData: {id, name,address,rating, price, city, category},
            showEditModal: !this.state.showEditModal});
    }

    changeShowModal() {
        this.setState({showModal: !this.state.showModal});
    }


    changeEditModal(){
        this.setState({showEditModal: !this.state.showEditModal});
    }

    deleteEvent(eventId) {
        deleteEvent(eventId)
            .then(() => {
                Alert.success("Событие успешно удалено!");
                let {events} = this.state;
                let filteredEvents = events.filter(event => event.id !== eventId);
                this.setState({events: filteredEvents});
                this.getEvents();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    handleSearchChange(event) {
        event.preventDefault();
        this.setState({search: event.target.value});
    }

    handleBackButton() {
        console.log(this.state.activePage);
        if (this.state.activePage !== 0) {
            this.setState({activePage: this.state.activePage - 1});
        }

        this.getEvents();
    }

    handleNextButton() {
        if (this.state.activePage !== this.state.totalPages - 1) {
            this.setState({activePage: this.state.activePage + 1});
        }

        this.getEvents();
    }

    render() {
        if (!this.state.events){
            return null;
        }

        let filteredEvents = this.state.events.filter(event => {
            return event.name.indexOf(this.state.search) !== -1;
        });

        return (
            <div className="container">
                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.changeShowModal}>Добавить</button>
                    <div>
                        <input className="form-control mr-sm-1" type="search" placeholder="Поиск"
                               aria-label="Search" value={this.state.search} onChange={this.handleSearchChange}/>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={this.changeShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание события</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Название события</label>
                                <input type="text" className="form-control" id="textInput"/>
                                <label htmlFor="exampleInputEmail1">Адрес</label>
                                <input type="text" className="form-control" id="textInput"/>
                                <label htmlFor="exampleInputEmail1">Цена</label>
                                <input type="text" className="form-control" id="textInput"/>
                                <label htmlFor="exampleInputEmail1">Город</label>
                                <button className="btn btn-light dropdown-toggle" type="button" id="cityDropDownButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    { "Город"}
                                </button>

                                <label htmlFor="exampleInputEmail1">Категория</label>
                                <button className="btn btn-light dropdown-toggle" type="button" id="cityDropDownButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    { "Категории"}
                                </button>

                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeShowModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary"  >
                            Изменить
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEditModal} onHide={this.changeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменение события</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Название события</label>
                                <input type="text" className="form-control" id="textInput"
                                       value={this.state.editEventData.name}/>
                                <label htmlFor="exampleInputEmail1">Адрес</label>
                                <input type="text" className="form-control" id="textInput"
                                       value={this.state.editEventData.address}/>
                                <label htmlFor="exampleInputEmail1">Цена</label>
                                <input type="text" className="form-control" id="textInput"
                                       value={this.state.editEventData.price}/>
                                <label htmlFor="exampleInputEmail1">Город</label>
                                <button className="btn btn-light dropdown-toggle" type="button" id="cityDropDownButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.editEventData.city ? this.state.editEventData.city.name : "Город"}
                                </button>

                                <label htmlFor="exampleInputEmail1">Категория</label>
                                <button className="btn btn-light dropdown-toggle" type="button" id="cityDropDownButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.editEventData.category ? this.state.editEventData.category.name : "Категории"}
                                </button>

                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeEditModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.updateCity} >
                            Изменить
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div className="list-group">
                    {
                        filteredEvents.map(event =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{event.name}</p>
                                    <p className="mt-2 flex-grow-1">{event.address}</p>
                                    <p className="mt-2 flex-grow-1">{event.rating}</p>
                                    <p className="mt-2 flex-grow-1">{event.price}</p>
                                    <p className="mt-2 flex-grow-1">{event.city.name}</p>
                                    <div className="btn-group" >
                                        <button type="button" className="mr-1 btn btn-outline-success"
                                                onClick={() => this.editEvent(event.id, event.name, event.address,
                                                    event.rating, event.price, event.city, event.category)}
                                        >Изменить</button>
                                        <button type="button" className="mr-1 btn btn-outline-danger"
                                                onClick={() => this.deleteEvent(event.id)}>Удалить</button>
                                    </div>
                                </li>
                            </div>)
                    }
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <button type="button" className="btn btn-light"
                                    onClick={this.handleBackButton}>Предыдущая</button>
                        </li>
                        <li className="page-item">
                            <button type="button" className="btn btn-light"
                                    onClick={this.handleNextButton}>Следующая</button>
                        </li>
                    </ul>
                </nav>

            </div>

        )
    }
};