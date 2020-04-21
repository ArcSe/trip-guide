import React, {Component} from "react";
import {
    getAllEvents,
    deleteEvent,
    getCities,
    getCategories,
    editEvent,
    editCity,
    createCity,
    deleteCity
} from "../util/APIUtils";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

class EditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editData: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const data = event.target.value;
        this.setState({editData: data});
    }

    handleUpdateButton(){
        const cityRequest = { id: this.props.eventId, name: this.state.editData};
        editEvent(eventRequest)
            .then(() =>{
                Alert.success("Город успешно изменен!");
                this.props.toggleDialog();
                this.props.getCities();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        })
    }


    render() {
        return(
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
                            <div className="filter-bar">
                                <EditComponent editState={this.state.editEventData} setEditState={this.setEditState}/>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.changeEditModal}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.updateEvent}>
                        Изменить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

class CreateModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createData: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateButton = this.handleCreateButton.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const data = event.target.value;
        this.setState({createData: data});
    }

    handleCreateButton() {
        const cityRequest = {name: this.state.createData};

        createCity(cityRequest)
            .then(response => {
                Alert.success("Город успешно добавлен!");
                this.props.toggleDialog();
                this.props.getCities();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    render() {
        return(
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
                            <label htmlFor="exampleInputEmail1">Категория</label>
                            <button className="btn btn-light dropdown-toggle" type="button" id="cityDropDownButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                { "Категории"}
                            </button>
                            <div className="filter-bar">
                                <EditComponent editState={this.state.editEventData} setEditState={this.setEditState}/>
                            </div>

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
        )
    }
}
class CategoryDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            loading: true,
        };

        this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        const categoriesRequest = {page: null, size: null,};
        getCategories(categoriesRequest)
            .then(response => {
                this.setState({categories: response.content});
                this.setState({loading: false});
                this.props.setEditState("loadingCategory", false);
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="categoryDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.category ? this.props.category.name : "Категория"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownCategoryManu">

                    <button className="dropdown-item"
                            type="button" onClick={() => this.props.setEditState("category", null)}>Очистить</button>
                    {
                        this.state.categories.map(category =>
                            <button className="dropdown-item"
                                    type="button" onClick={() => this.props.setEditState("category", category)}>
                                {category.name}</button>)
                    }
                </div>
            </div>)
    }
}

class CityDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: null,
            loading: true,
        };

        this.getCities = this.getCities.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    getCities() {
        const citiesRequest = {page: null, size: null};
        getCities(citiesRequest)
            .then(response => {
                const cities = response.content;
                this.setState({cities: cities});
                this.props.setEditState("city", cities[0]);
                this.props.setEditState("loadingCity", false);
                this.setState({loading: false});
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="cityDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.city ? this.props.city.name : "Город"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        this.state.cities.map(city =>
                            <button className="dropdown-item"
                                    type="button"
                                    onClick={() => this.props.setEditState("city", city)}>{city.name}</button>)
                    }
                </div>
            </div>
        )
    }
}

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    handleSearchChange(event) {
        event.preventDefault();
        this.props.setEventState("search", event.target.value);
    }

    handleClearClick() {
        this.props.getEvents();
    }

    handleSearchButton() {
        this.props.getEventsByName(this.props.search);
    }

    render() {
        return(
            <div>
                <form className="form-inline" onSubmit={event => event.preventDefault()}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Искать"
                           aria-label="Search" value={this.props.search} onChange={this.handleSearchChange}
                           onClick={this.handleClearClick}/>
                    <button className="btn btn-outline-success my-2 my-sm-0"
                            onClick={this.handleSearchButton}>Искать</button>
                </form>
            </div>
        )
    }
}

class EditComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <label htmlFor="exampleInputEmail1">Город</label>
                <div className="city-bar mb-2 ml-1 row align-items-center">
                    <CityDropDown city={this.props.editState.city}
                                  setEditState={this.props.setEditState} />
                </div>
                <label htmlFor="exampleInputEmail1">Категория</label>
                <div className="city-bar mb-2 ml-1 row align-items-center">
                    <CategoryDropDown category={this.props.editState.category}
                                  setEditState={this.props.setEditState}/>
                </div>

            </div>
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
                        onClick={this.props.toggleDialog}>Добавить</button>
            </div>
        )
    }
}

class Content extends Component {
    constructor(props) {
        super(props);

        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }

    handleEditButton(eventId){
        this.props.toggleDialog();
        this.props.setEventsState("editEventId", eventId);
    }

    handleDeleteButton(eventId) {
        deleteCity(eventId)
            .then(() => {
                Alert.success("Событие успешно удалено!");
                this.props.getEvents();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }


    render() {
        return(
            <div className="list-group">
                {
                    this.props.events.map( event =>
                        <div>
                            <li className="mb-1 list-group-item d-flex justify-content-between">
                                <p className="mt-2 flex-grow-1">{event.name}</p>
                                <div className="btn-group" >
                                    <button type="button" className="mr-1 btn btn-outline-success"
                                            onClick={() => this.handleEditButton(event.id)}>Изменить</button>
                                    <button type="button" className="mr-1 btn btn-outline-danger"
                                            onClick={() => this.handleDeleteButton(event.id)}>Удалить</button>
                                </div>
                            </li>
                        </div>)
                }
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
            this.props.setCitiesState("activePage", activePage - 1);
        }

        this.props.getEvents();
    }

    handleNextButton() {
        const activePage = this.props.activePage;
        const totalPages = this.props.totalPages;

        if (activePage !== totalPages - 1) {
            this.props.setEventsState("activePage", activePage + 1);
        }

        this.props.getEvents();
    }

    render() {
        return(
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
        )
    }
}

export class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            showCreateModal: false,
            showEditModal: false,
            editEventId: null,
            search: null,
            activePage: 0,
            totalPages: 0,
            pageSize: 5,
        };

        this.getEventsByName = this.getEventsByName.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    getEvents() {
        getAllEvents({page: this.state.eventactivePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages})
                this.setState({events: response.content});
            });
    }

    getEventsByName() {
        getEventsByName({name: this.state.search})
            .then(response => {
                this.setState({events: [response]});
            });
    }

    editEvent(id,name,address,rating, price, city, category){
        this.setState({editEventData: {id, name,address,rating, price, city, category},
            showEditModal: !this.state.showEditModal});
    }
    setNewState(key, value) {
        this.setState({[key]: value});
    }

    toggleCreateModal() {
        this.setState({showCreateModal: !this.state.showCreateModal});
    }

    toggleEditModal() {
        this.setState({showEditModal: !this.state.showEditModal});
    }

    updateEvent(){
        const eventRequest = { id: this.state.editEventData.id, name: this.state.editEventData.name,
            address : this.state.editEventData.address, rating: this.state.editEventData.rating,
            price: this.state.editEventData.price, city: this.state.editEventData.city, category:this.state.editEventData.category};
        editEvent(eventRequest)
            .then(() =>{
                Alert.success("Событие успешно изменено!");

            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        })
    }

    setEditState(key, value) {

        this.setState({
            editEventData: {
                ...this.state.editEventData,
                [key]: value,
            }
        });
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