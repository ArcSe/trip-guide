import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'


import {ButtonToolbar, ButtonGroup, Button, Container, Row, Col} from "react-bootstrap";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import {addCategory, getCategories, getCities, getCurrentUser, signup} from "../util/APIUtils";
import userLogo from "../img/user.jpg";
import Modal from "react-bootstrap/Modal";
import Alert from "react-s-alert";

class Empty extends React.Component {
    render() {
        return (
            <h1>Empty</h1>
        )
    }
}

class Users extends React.Component {
    render() {
        return (
            <h1>Users</h1>
        )
    }
};

class Cities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: null,
        }

        this.getCitiesFromDB = this.getCitiesFromDB.bind(this);
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

    render() {
        if (!this.state.cities){
            return "";
        }
        return (
            <div className="container">
                <div>
                    <button type="button" className="mb-1 btn btn-outline-dark">Добавить</button>
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

class Events extends React.Component {
    render() {
        return (
            <h1>Events</h1>
        )
    }
};

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            showModal: false,
            newCategoryData: null,
        };

        this.getCategoriesFromDB = this.getCategoriesFromDB.bind(this);
        this.changeShowModal = this.changeShowModal.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
    }

    componentDidMount() {
        this.getCategoriesFromDB();
    }

    getCategoriesFromDB() {
        getCategories()
            .then(response => {
                this.setState({categories: JSON.parse(JSON.stringify(response))});
            });
    }

    changeShowModal() {
        this.setState({showModal: !this.state.showModal});
    }

    addNewCategory() {
        const categoryRequest = {name: this.state.newCategoryData};

        addCategory(categoryRequest)
            .then(response => {
                Alert.success("Категория успешно добавлена!");
                this.setState({showModal: false});

                let { categories } = this.state;
                categories.push({id: response.id, name: response.name});
                this.setState({categoties: categories});
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        })
    }

    render() {
        if (!this.state.categories){
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
                                <label htmlFor="exampleInputEmail1">Название категории</label>
                                <input type="text" className="form-control" id="textInput"
                                       onChange={e => {this.state.newCategoryData = e.target.value; }}
                                       placeholder="Введите название категории"/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.changeShowModal}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.addNewCategory}>
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
                        this.state.categories.map(category =>
                            <div>
                                <li className="mb-1 list-group-item d-flex justify-content-between">
                                    <p className="mt-2 flex-grow-1">{category.name}</p>
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


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "empty",
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }



    loadCurrentlyLoggedInUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    componentDidMount() {
        //this.loadCurrentlyLoggedInUser();
    }

    handleClick(name) {
        this.setState({state: name});
    }

    render() {
        return (

            <div className="container">
                <div className='profile-container'>
                    <div className="media-container ">
                        <div className="media">
                            <img src={userLogo} className="rounded img" alt="img" width="150" height="150"/>
                            <div className="media-body-left">
                                <h4>{this.props.currentUser.name}</h4>
                                <p class="lead">Администратор</p>
                                <p class="lead">Email: {this.props.currentUser.email}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="profile-button" >
                    <div className="btn-toolbar justify-content-between" role="toolbar"
                         aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="First group">
                            <button type="button" className="ml-3 btn btn-outline-dark"
                                    onClick={() => this.handleClick("users")}>Пользователи</button>
                            <button type="button" className="ml-1 btn btn-outline-dark"
                                    onClick={() => this.handleClick("events")}>События</button>
                            <button type="button" className="ml-1 btn btn-outline-dark"
                                    onClick={() => this.handleClick("categories")}>Категории</button>
                            <button type="button" className="ml-1 btn btn-outline-dark"
                                    onClick={() => this.handleClick("cities")}>Города</button>
                        </div>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-1" type="search" placeholder="Search"
                                   aria-label="Search"/>
                                   <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search
                                    </button>
                        </form>
                    </div>
                </div>

                <div className="profile-button">
                    <div className="row">
                        <div className="container">
                            {(this.state.state === "empty") && <Empty></Empty>}
                            {(this.state.state === "users") && <Users></Users>}
                            {(this.state.state === "events") && <Events></Events>}
                            {(this.state.state === "categories") && <Categories></Categories>}
                            {(this.state.state === "cities") && <Cities></Cities>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}