import React from "react";
import {getEvents, deleteEvent} from "../util/APIUtils";
import Alert from "react-s-alert";


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
                city: '',
                price: '',
                category: '',
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
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        getEvents({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages})
                this.setState({events: response.content});
            });
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

                <div className="list-group">
                    {
                        filteredEvents.map(event =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{event.name}</p>
                                    <div className="btn-group" >
                                        <button type="button" className="mr-1 btn btn-outline-success">Изменить</button>
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