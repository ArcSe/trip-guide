import React, {Component} from "react";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import EventAPI from "../util/EventAPI";
import CategoryAPI from "../util/CategoryAPI";
import CityAPI from "../util/CityAPI";
import {Schedule} from "./Schedule"





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
        this.props.setEventsState("search", event.target.value);
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

    handleScheduleButton(eventId, eventName){
       this.props.toggleScheduleDialog();
        this.props.setEventsState("editEventId", eventId);
        this.props.setEventsState("editEventName", eventName);
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
                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <CreateButton toggleDialog={this.props.toggleCreateModal}/>
                    <SearchComponent search={this.props.search}
                                     getEvents={this.props.getEvents}
                                     getEventsByName={this.props.getEventsByName}
                                     setEventsState={this.props.setNewState}/>
                </div>
                <div className="table-responsive">
                <table className="table">
                    <thead className="thead">
                    <tr>
                        <th scope="col" className="lead">#</th>
                        <th scope="col" className="lead">Название</th>
                        <th scope="col" className="lead">Адресс</th>
                        <th scope="col" className="lead">Рейтинг</th>
                        <th scope="col" className="lead">Город</th>
                        <th scope="col" className="lead">Категория</th>
                        <th scope="col" className="lead"/>
                    </tr>
                    </thead>
                    {
                        this.props.events.map( event =>
                            <tbody>
                                <tr>
                                    <th scope="row" className="lead">{event.id}</th>
                                    <td className="lead">{event.name}</td>
                                    <td className="lead">{event.address}</td>
                                    <td className="lead">{event.rating}</td>
                                    <td className="lead">{event.city.name}</td>
                                    <td className="lead">{event.category.name}</td>
                                    <td className="lead">
                                        <div className="btn-group ml-lg-5" >
                                            <button type="button" className="mr-1 btn btn-outline-dark"
                                                    onClick={() => this.handleScheduleButton(event.id, event.name)}>Расписание
                                            </button>
                                            <button type="button" className="mr-1 btn btn-outline-success"
                                                    onClick={() => this.handleEditButton(event.id)}>Изменить</button>
                                            <button type="button" className="mr-1 btn btn-outline-danger"
                                                    onClick={() => this.handleDeleteButton(event.id)}>Удалить</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>)
                    }
                </table>
                </div>
                <Pagination totalPages={this.props.totalPages}
                            activePage={this.props.activePage}
                            setEventsState={this.props.setEventsState}
                            getEvents={this.props.getEvents}/>
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
        if (this.props.totalPages <= 1) {
            return null;
        }

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
            editEventName: null,
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
        EventAPI.getEventsAdmin({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages});
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


                {this.state.showScheduleModal ?
                    (<Schedule
                    show={this.state.showScheduleModal}
                    toggleDialog={this.toggleScheduleModal}
                    eventId={this.state.editEventId}
                    eventName ={this.state.editEventName}
                    />)
                    :
                    (<Content toggleDialog={this.toggleEditModal}
                              toggleCreateModal={this.toggleCreateModal}
                              search={this.state.search}
                              getEventsByName={this.getEventsByName}
                              setNewState={this.setNewState}
                             toggleScheduleDialog={this.toggleScheduleModal}
                             setEventsState={this.setNewState}
                             getEvents={this.getEvents}
                             events={this.state.events}
                             show={this.state.showScheduleModal}
                             eventId={this.state.editEventId}
                             eventName={this.state.editEventName}
                              totalPages={this.state.totalPages}
                              activePage={this.state.activePage}

                    />)
                }


            </div>
        )
    }
};