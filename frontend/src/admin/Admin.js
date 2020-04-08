import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'


import {ButtonToolbar, ButtonGroup, Button, Container, Row, Col} from "react-bootstrap";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import {getCategories, getCities, getCurrentUser} from "../util/APIUtils";
import userLogo from "../img/user.jpg";

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
            <div className="list-group">
                {
                    this.state.cities.map(cities =>
                        <button type="button"
                                className="list-group-item list-group-item-action">
                            {cities.name}</button>)
                }
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

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
        }

        this.getCategoriesFromDB = this.getCategoriesFromDB.bind(this);
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

    render() {
        if (!this.state.categories){
            return "";
        }
        return (
            <div className="container">
                <button type="button" className="btn btn-outline-dark">Добавить</button>
                <div className="list-group button-in-list">
                    {
                        this.state.categories.map(category =>
                            <div className="btn-group " >
                                <button type="button"
                                        className="list-group-item list-group-item-action">
                                    {category.name}</button>
                                <button type="button" className="btn btn-outline-success">Изменить</button>

                                <button type="button" className="btn btn-outline-danger">Удалить</button>
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
                                <h4 class="lead">{this.props.currentUser.name}</h4>
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
                            <div className="btn-group col-md-4">
                                <button type="button" className="btn btn-outline-dark"
                                        onClick={() => this.handleClick("users")}>Пользователи</button>
                            </div>
                            <div className="btn-group col-md-4">
                                <button type="button" className="btn btn-outline-dark"
                                        onClick={() => this.handleClick("events")}>События</button>
                            </div>
                            <div className="btn-group col-md-4">
                                <button type="button" className="btn btn-outline-dark"
                                        onClick={() => this.handleClick("categories")}>Категории</button>
                            </div>
                            <div className="btn-group col-md-4">
                                <button type="button" className="btn btn-outline-dark"
                                        onClick={() => this.handleClick("cities")}>Города</button>
                            </div>
                        </div>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                                   <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search
                                    </button>
                        </form>
                    </div>
                </div>

                <div className="profile-button">
                    <div className="row">
                        <div className="container">
                            {(this.state.state == "empty") && <Empty></Empty>}
                            {(this.state.state == "users") && <Users></Users>}
                            {(this.state.state == "events") && <Events></Events>}
                            {(this.state.state == "categories") && <Categories></Categories>}
                            {(this.state.state == "cities") && <Cities></Cities>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}