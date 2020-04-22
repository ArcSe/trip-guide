import React, {Component} from "react";
import {
    createCity,
    deleteCity,
    editCity,
    getAllEvents,
    getCategories,
    getCities,
    getEventsByName
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
            name: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const data = event.target.value;
        this.props.setEditState("editData", {name: data,});
    }

    handleUpdateButton(){
        alert(this.props.editData.name);
        const eventRequest = {
            id: this.props.cityId,
            name: this.props.editData.name,
            address: this.props.editData.address,
            price: this.props.editData.price,
            city:{
                id: this.props.editData.city.id,
                name: this.props.editData.city.name,
            },
            category: {
                id: this.props.editData.category.id,
                name: this.props.editData.name,
            }
        };

        editCity(eventRequest)
            .then(() =>{
                Alert.success("Событие успешно изменен!");
                this.props.toggleDialog();
                this.props.getEvents();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
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
                                   value={this.props.editData.name}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="exampleInputEmail1">Адрес</label>
                            <input type="text" className="form-control" id="textInput"
                                   value={this.props.editData.address}
                                   onChange={this.handleInputChange}/>
                            <label htmlFor="exampleInputEmail1">Цена</label>
                            <input type="text" className="form-control" id="textInput"
                                   value={this.props.editData.price}
                                   onChange={this.handleInputChange}/>
                            <div className="filter-bar">
                                <EditComponent editState={this.props.editData} setEditState={this.props.setEditState}/>
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
                city: null,
                category: null,
            },
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
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
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
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleCreateButton} >
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
                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="categoryDropDownButton"
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
                <button className="btn btn-outline-dark dropdown-toggle" type="button" id="cityDropDownButton"
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
        this.state={
            editData:{
                name:null,
                address:null,
                price: null,
            }
        }

        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }

    handleEditButton(eventId,eventName, eventAddress, eventPrice){
        alert(eventName);
        this.setState({editData:{eventId,eventName, eventAddress, eventPrice}})
        const editEvent = {id:eventId,name:eventName,address:eventAddress, price:eventPrice}
        alert(editEvent.price);
        this.props.toggleDialog();
        this.props.setEventsState("editData", editEvent);
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
                                            onClick={() => this.handleEditButton(event.id,
                                                event.name, event.address, event.price)}>Изменить</button>
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
            editEventId: null,
            search: null,
            activePage: 0,
            totalPages: 0,
            pageSize: 5,
            editData:{
                name:null,
                address:null,
                price: null,
                city:{
                    id:null,
                    name:null,
                },
                category:{
                    id:null,
                    name:null,
                }
            }
        };

        this.setEditState = this.setEditState.bind(this);
        this.getEventsByName = this.getEventsByName.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    setEditState(key, value) {

        this.setState({
            editData: {
                ...this.state.editData,
                [key]: value,
            }
        });
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

    getEventsByName() {
        getEventsByName({name: this.state.search})
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
                                   getEvents={this.getEvents}
                />

                <EditModalDialog show={this.state.showEditModal}
                                 toggleDialog={this.toggleEditModal}
                                 getEvents={this.getEvents}
                                 eventId={this.state.editEventId}
                                 setEditState={this.setEditState}
                                 editData={this.state.editData}
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
                         events={this.state.events}/>

                <Pagination totalPages={this.state.totalPages}
                            activePage={this.state.activePage}
                            setEventsState={this.setNewState}
                            getEvents={this.getEvents}/>
            </div>
        )
    }
};