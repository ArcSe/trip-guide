import React from "react";
import {editCities, createCity, deleteCity, getCities} from "../util/APIUtils";
import Alert from "react-s-alert";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

export class Cities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: null,
            showModal: false,
            newCityData: null,
            showEditModal: false,
            editCityData: {
                id: '',
                name: ''
            },
            search: '',
            activePage: 0,
            pageSize: 5,
        };

        this.getCities = this.getCities.bind(this);
        this.changeEditModal = this.changeEditModal.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.createCity = this.createCity.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    getCities() {
        getCities({page: this.state.activePage, size: this.state.pageSize})
            .then(response => {
                this.setState({totalPages: response.totalPages})
                this.setState({cities: response.content});
            });
    }

    changeShowModal() {
        this.setState({showModal: !this.state.showModal});
    }

    createCity() {
        const cityRequest = {name: this.state.newCityData};

        createCity(cityRequest)
            .then(response => {
                Alert.success("Город успешно добавлен!");
                this.setState({showModal: false});

                let { cities } = this.state;
                cities.push({id: response.id, name: response.name});
                this.setState({cities: cities});
                this.getCities();
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
    }


    changeEditModal(){
        this.setState({showEditModal: !this.state.showEditModal});
    }

    updateCity(){
        const cityRequest = {id:this.state.editCityData.id, name: this.state.editCityData.name};
        editCities(cityRequest.id, cityRequest)
            .then(() =>{
                Alert.success("Город успешно изменен!");
                this.setState({showEditModal: false});
                this.getCities();
            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так');
        })
    }

    editCity(id, name){
        this.setState({editCityData: {id, name}, showEditModal: !this.state.showEditModal});
    }

    deleteCity(cityId) {
        deleteCity(cityId)
            .then(() => {
                Alert.success("Город успешно удален!");
                let {cities} = this.state;
                let filteredCities = cities.filter(city => city.id !== cityId);
                this.setState({cities: filteredCities});
                this.getCities();
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

        this.getCities();
    }

    handleNextButton() {
        if (this.state.activePage !== this.state.totalPages - 1) {
            this.setState({activePage: this.state.activePage + 1});
        }

        this.getCities();
    }

    render() {
        if (!this.state.cities){
            return null;
        }

        let filteredCities = this.state.cities.filter(city => {
            return city.name.indexOf(this.state.search) !== -1;
        });

        return (
            <div className="container">

                <Modal show={this.state.showModal} onHide={this.changeShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить новый город</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Название города</label>
                                <input type="text" className="form-control" id="textInput"
                                       onChange={e => {this.state.newCityData = e.target.value; }}
                                       placeholder="Введите название города"/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeShowModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.createCity}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.changeShowModal}>Добавить</button>
                    <div>
                        <input className="form-control mr-sm-1" type="search" placeholder="Поиск"
                               aria-label="Search" value={this.state.search} onChange={this.handleSearchChange}/>
                    </div>
                </div>



                <Modal show={this.state.showEditModal} onHide={this.changeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить название города</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Название города</label>
                                <input type="text" className="form-control" id="textInput"
                                       value={this.state.editCityData.name}
                                       onChange={e => {let {editCityData} = this.state;

                                           editCityData.name = e.target.value;

                                            this.setState({editCityData});
                                       }}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeEditModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.updateCity}>
                            Изменить
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="list-group">
                    {
                        filteredCities.map(city =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{city.name}</p>
                                    <div className="btn-group" >
                                        <button type="button" className="mr-1 btn btn-outline-success"
                                                onClick={() => this.editCity(city.id, city.name)}>Изменить</button>
                                        <button type="button" className="mr-1 btn btn-outline-danger"
                                                onClick={() => this.deleteCity(city.id)}>Удалить</button>
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