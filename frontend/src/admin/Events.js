import React, {Component} from "react";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import EventAPI from "../util/EventAPI";
import CategoryAPI from "../util/CategoryAPI";
import CityAPI from "../util/CityAPI";
import {Schedule} from "../admin/Schedule"
import {Users} from "./Users";




class EditModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editData:{
                id: null,
                name:null,
                address:null,
                description: null,
                city:{
                    id: null,
                },
                category:{
                    id: null,
                }

            }
        };

        this.handleUpdateButton = this.handleUpdateButton.bind(this);
    }


    handleUpdateButton(){

        const eventRequest = {
            id: this.props.eventId,
            name: this.state.editData.name,
            address: this.state.editData.address,
            description: this.state.editData.description,
            rating: this.state.editData.rating,
            cityId: this.props.eventData.city.id,
            categoryId: this.props.eventData.category.id,
        };
        EventAPI.editEvent( eventRequest)
            .then(() =>{
                Alert.success("Событие изменено!");
                this.props.toggleDialog();
                this.props.getEvents();
            }).catch(error => {
                Alert.error((error && error.message) || 'Что-то пошло не так');
            })
    }


    render() {
        return(
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение события</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Название события</label>
                            <input type="text" className="form-control" id="textInput"
                                   value={this.state.editData.name}
                                   onChange={e => {let {editData} = this.state;
                                   editData.name = e.target.value;
                                   this.setState({editData})}}/>
                            <label htmlFor="exampleInputEmail1">Адрес</label>
                            <input type="text" className="form-control" id="textInput"
                                   value={this.state.editData.address}
                                   onChange={e => {let {editData} = this.state;
                                       editData.address = e.target.value;
                                       this.setState({editData})}}/>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea2">Описание</label>
                                <textarea className="form-control rounded-0" id="exampleFormControlTextarea2"
                                          rows="3" value={this.state.editData.description}
                                          onChange={e => {let {editData} = this.state;
                                              editData.description = e.target.value;
                                              this.setState({editData})}}/>
                            </div>
                            <div className="filter-bar">
                                <EditComponent eventState={this.props.eventData} setDataState={this.props.setDataState}/>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleUpdateButton}>
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
            createData: {
                name: null,
                address: null,
                description: null,
                cityId: null,
                categoryId: null,
            }
        };

        this.handleCreateButton = this.handleCreateButton.bind(this);
    }



    handleCreateButton() {

        const eventRequest = {
            name: this.state.createData.name,
            address: this.state.createData.address,
            description: this.state.createData.description,
            rating: this.state.createData.rating,
            cityId: this.props.eventData.city.id,
            categoryId: this.props.eventData.category.id,
        };
        EventAPI.createEvent( eventRequest)
            .then(() =>{
                Alert.success("Событие добавлено!");
                this.props.toggleDialog();
                this.props.getEvents();
            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так');
        })
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
                            <label htmlFor="exampleInputEmail1">Название события</label>
                            <input type="text" className="form-control" id="textInput"
                                   onChange={e =>{let {createData} = this.state;
                                       createData.name = e.target.value;
                                       this.setState({createData})} }
                                   placeholder="Введите название события"/>
                            <label htmlFor="exampleInputEmail1">Адрес</label>
                            <input type="text" className="form-control" id="textInput"
                                   onChange={e =>{let {createData} = this.state;
                                       createData.address = e.target.value;
                                       this.setState({createData})} }
                                   placeholder="Введите адрес события"/>
                                   <label htmlFor="exampleFormControlTextarea2">Описание</label>
                            <textarea className="form-control rounded-0" id="exampleFormControlTextarea2"
                                      rows="3"
                                      onChange={e => {let {createData} = this.state;
                                          createData.description = e.target.value;
                                          this.setState({createData})}}
                                      placeholder="Введите описание события"/>
                            <div className="filter-bar">
                                <EditComponent eventState={this.props.eventData} setDataState={this.props.setDataState}/>
                            </div>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
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
        CategoryAPI.getCategories(categoriesRequest)
            .then(response => {
                this.setState({categories: response.content});
                this.setState({loading: false});
                this.props.setDataState("loadingCategory", false);
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="dropdown">
                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="categoryDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.category ? this.props.category.name : "Категория"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownCategoryManu">

                    <button className="dropdown-item"
                            type="button" onClick={() => this.props.setDataState("category", null)}>Очистить</button>
                    {
                        this.state.categories.map(category =>
                            <button className="dropdown-item"
                                    type="button" onClick={() => this.props.setDataState("category", category)}>
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
        CityAPI.getCities(citiesRequest)
            .then(response => {
                const cities = response.content;
                this.setState({cities: cities});
                this.props.setDataState("city", cities[0]);
                this.props.setDataState("loadingCity", false);
                this.setState({loading: false});
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="dropdown">
                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="cityDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.city ? this.props.city.name : "Город"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        this.state.cities.map(city =>
                            <button className="dropdown-item"
                                    type="button"
                                    onClick={() => this.props.setDataState("city", city)}>{city.name}</button>)
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
                    <CityDropDown city={this.props.eventState.city}
                                  setDataState={this.props.setDataState} />
                </div>
                <label htmlFor="exampleInputEmail1">Категория</label>
                <div className="city-bar mb-2 ml-1 row align-items-center">
                    <CategoryDropDown category={this.props.eventState.category}
                                  setDataState={this.props.setDataState}/>
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

    handleScheduleButton(){
       this.props.toggleScheduleDialog();
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
            <div className="list-group">
                {
                    this.props.events.map( event =>
                        <div>
                            <li className="mb-1 list-group-item d-flex justify-content-between">
                                <p className="mt-2 flex-grow-1">{event.name}</p>
                                <p className="mt-2 flex-grow-1">{event.address}</p>
                                <p className="mt-2 flex-grow-1">{event.rating}</p>
                                <p className="mt-2 flex-grow-1">{event.city.name}</p>
                                <p className="mt-2 flex-grow-1">{event.category.name}</p>

                                <div className="btn-group" >
                                    <button type="button" className="mr-1 btn btn-outline-dark"
                                            onClick={() => this.handleScheduleButton()}>
                                        {(this.props.show) && <Schedule
                                            show={this.props.show}
                                            toggleScheduleDialog={this.props.toggleScheduleDialog}/>}
                                        Расписание
                                    </button>
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
            this.props.setEventsState("activePage", activePage - 1);
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
            showScheduleModal: false,
            editEventId: null,
            search: null,
            activePage: 0,
            totalPages: 0,
            pageSize: 5,
            loadingCategory: true,
            loadingCity: true,
            eventData:{
                city:{
                    id:null,
                    name: null,
                },
                category:{
                    id:null,
                    name: null,
                }
            }
        };

        this.setDataState = this.setDataState.bind(this);
        this.getEventsByName = this.getEventsByName.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleScheduleModal = this.toggleScheduleModal.bind(this);
    }

    setDataState(key, value) {

        this.setState({
            eventData: {
                ...this.state.eventData,
                [key]: value,
            }
        });
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        EventAPI.getEvent({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages})
                this.setState({events: response.content});
            });
    }

    getEventsByName() {
        EventAPI.getEventsByName({name: this.state.search})
            .then(response => {
                this.setState({events: [response]});
            });
    }

    setNewState(key, value) {
        this.setState({[key]: value});
    }

    toggleCreateModal() {
        this.setState({showCreateModal: !this.state.showCreateModal});
    }
    toggleScheduleModal() {
        this.setState({showScheduleModal: !this.state.showScheduleModal});
    }

    toggleEditModal() {
        this.setState({showEditModal: !this.state.showEditModal});
    }


    render() {
        if (!this.state.events){
            return null;
        }

        return (
            <div className="container">
                <CreateModalDialog show={this.state.showCreateModal}
                                   toggleDialog={this.toggleCreateModal}
                                   getEvents={this.getEvents}
                                   setDataState={this.setDataState}
                                   eventData={this.state.eventData}
                />

                <EditModalDialog show={this.state.showEditModal}
                                 toggleDialog={this.toggleEditModal}
                                 getEvents={this.getEvents}
                                 eventId={this.state.editEventId}
                                 setDataState={this.setDataState}
                                 eventData={this.state.eventData}
                />

                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <CreateButton toggleDialog={this.toggleCreateModal}/>
                    <SearchComponent search={this.state.search}
                                     getEvents={this.getEvents}
                                     getEventsByName={this.getEventsByName}
                                     setEventsState={this.setNewState}/>
                </div>

                <Content toggleDialog={this.toggleEditModal}
                         setEventsState={this.setNewState}
                         getEvents={this.getEvents}
                         events={this.state.events}
                         show={this.state.showScheduleModal}
                         toggleScheduleDialog={this.toggleScheduleModal}
                />

                <Pagination totalPages={this.state.totalPages}
                            activePage={this.state.activePage}
                            setEventsState={this.setNewState}
                            getEvents={this.getEvents}/>
            </div>
        )
    }
};