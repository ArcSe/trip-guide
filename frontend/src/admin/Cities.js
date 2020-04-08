import React from "react";
import {addCities, getCities} from "../util/APIUtils";
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
        }

        this.getCitiesFromDB = this.getCitiesFromDB.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.addNewCity = this.addNewCity.bind(this);
    }

    componentDidMount() {
        this.getCitiesFromDB();
    }

    getCitiesFromDB() {
        getCities()
            .then(response => {
                this.setState({cities: JSON.parse(JSON.stringify(response))});
            });
    }

    changeShowModal() {
        this.setState({showModal: !this.state.showModal});
    }

    addNewCity() {
        const cityRequest = {name: this.state.newCityData};

        addCities(cityRequest)
            .then(response => {
                Alert.success("Город успешно добавлена!");
                this.setState({showModal: false});

                let { cities } = this.state;
                cities.push({id: response.id, name: response.name});
                this.setState({cities: cities});
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
    }
    render() {
        if (!this.state.cities){
            return null;
        }
        return (
            <div className="container">

                <Modal show={this.state.showModal} onHide={this.changeShowModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить новую категорию</Modal.Title>
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
                        <Button variant="primary" onClick={this.addNewCity}>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    <button type="button" className="mb-1 btn btn-outline-dark"
                            onClick={this.changeShowModal}>Добавить</button>
                </div>
                <div className="list-group">
                    {
                        this.state.cities.map(city =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{city.name}</p>
                                    <div className="btn-group" >
                                        <button type="button" className="mr-1 btn btn-outline-success">Изменить</button>
                                        <button type="button" className="mr-1 btn btn-outline-danger">Удалить</button>
                                    </div>
                                </li>
                            </div>)
                    }
                </div>
            </div>
        )
    }
};