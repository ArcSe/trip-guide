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
            newEditCityData: {
                id: '',
                name: ''
            },
        }

        this.getCities = this.getCities.bind(this);
        this.changeEditModal = this.changeEditModal.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.createCity = this.createCity.bind(this);
        this.updateCity = this.updateCity.bind(this);

    }

    componentDidMount() {
        this.getCities();
    }

    getCities() {
        getCities()
            .then(data => this.setState({cities: data}));
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
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
    }


    changeEditModal(){
        this.setState({showEditModal: !this.state.showEditModal});
    }

    updateCity(){
        const cityRequest = {id:this.state.newEditCityData.id, name: this.state.newEditCityData.name};
        editCities(cityRequest.id, cityRequest)
            .then(response =>{
                Alert.success("Город успешно изменен!");
                this.setState({showEditModal: false});
                this.getCities();

            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так');
        })
    }

    editCity(id, name){
        this.setState({newEditCityData: {id, name}, showEditModal: !this.state.showEditModal});
    }
    deleteCity(cityId) {
        deleteCity(cityId)
            .then(() => {
                Alert.success("Город успешно удален!");
                let {cities} = this.state;
                let filteredCities = cities.filter(city => city.id !== cityId);
                this.setState({cities: filteredCities});
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });
    }

    render() {
        if (!this.state.cities){
            return null;
        }
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
                <div>
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.changeShowModal}>Добавить</button>
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
                                       value={this.state.newEditCityData.name}
                                       onChange={e => {let {newEditCityData} = this.state;

                                           newEditCityData.name = e.target.value;

                                            this.setState({newEditCityData});
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
                        this.state.cities.map(city =>
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
            </div>
        )
    }
};