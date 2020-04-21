import React, {Component} from "react";
import {createCity, deleteCity, editCity, getCities, getCitiesByName} from "../util/APIUtils";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

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
        const cityRequest = { id: this.props.cityId, name: this.state.editData};
        editCity(cityRequest)
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
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить город</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Название города</label>
                            <input type="text" className="form-control" id="textInput"
                                   value={this.state.editData}
                                   onChange={this.handleInputChange}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleUpdateButton}>
                        Обновить
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
            <Modal show={this.props.show} onHide={this.props.toggleDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый город</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Название города</label>
                            <input type="text" className="form-control" id="textInput"
                                   onChange={this.handleInputChange}
                                   placeholder="Введите название города"/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggleDialog}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={this.handleCreateButton}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
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
        this.props.setCitiesState("search", event.target.value);
    }

    handleClearClick() {
        this.props.getCities();
    }

    handleSearchButton() {
        this.props.getCitiesByName(this.props.search);
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

    handleEditButton(cityId){
        this.props.toggleDialog();
        this.props.setCitiesState("editCityId", cityId);
    }

    handleDeleteButton(cityId) {
        deleteCity(cityId)
            .then(() => {
                Alert.success("Город успешно удален!");
                this.props.getCities();
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }


    render() {
        return(
            <div className="list-group">
                {
                    this.props.cities.map(city =>
                        <div>
                            <li className="mb-1 list-group-item d-flex justify-content-between">
                                <p className="mt-2 flex-grow-1">{city.name}</p>
                                <div className="btn-group" >
                                    <button type="button" className="mr-1 btn btn-outline-success"
                                            onClick={() => this.handleEditButton(city.id)}>Изменить</button>
                                    <button type="button" className="mr-1 btn btn-outline-danger"
                                            onClick={() => this.handleDeleteButton(city.id)}>Удалить</button>
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

        this.props.getCities();
    }

    handleNextButton() {
        const activePage = this.props.activePage;
        const totalPages = this.props.totalPages;

        if (activePage !== totalPages - 1) {
            this.props.setCitiesState("activePage", activePage + 1);
        }

        this.props.getCities();
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

export class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: null,
            showCreateModal: false,
            showEditModal: false,
            editCityId: null,
            search: null,
            activePage: 0,
            totalPages: 0,
            pageSize: 5,
        };

        this.getCitiesByName = this.getCitiesByName.bind(this);
        this.getCities = this.getCities.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditModal = this.toggleEditModal.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    getCities() {
        getCities({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages});
                this.setState({cities: response.content});
            });
    }

    getCitiesByName() {
        getCitiesByName({name: this.state.search})
            .then(response => {
                this.setState({cities: [response]});
            });
    }

    setFilterState(key, value) {
        this.setState({[key]: value});
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
        if (!this.state.cities){
            return null;
        }

        return (
            <div className="container">
                <CreateModalDialog show={this.state.showCreateModal}
                                   toggleDialog={this.toggleCreateModal}
                                   getCities={this.getCities}/>

                <EditModalDialog show={this.state.showEditModal}
                                 toggleDialog={this.toggleEditModal}
                                 getCities={this.getCities}
                                 cityId={this.state.editCityId}/>

                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <CreateButton toggleDialog={this.toggleCreateModal}/>
                    <SearchComponent search={this.state.search}
                                     getCities={this.getCities}
                                     getCitiesByName={this.getCitiesByName}
                                     setCitiesState={this.setNewState}/>
                </div>

                <Content toggleDialog={this.toggleEditModal}
                         setCitiesState={this.setNewState}
                         getCities={this.getCities}
                         cities={this.state.cities}/>

                <Pagination totalPages={this.state.totalPages}
                            activePage={this.state.activePage}
                            setCitiesState={this.setNewState}
                            getCities={this.getCities}/>
            </div>

        )
    }
}