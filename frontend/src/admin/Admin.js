import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'


import {ButtonToolbar, ButtonGroup, Button, Container, Row, Col} from "react-bootstrap";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import {getCategories, getCurrentUser} from "../util/APIUtils";

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
    render() {
        return (
            <h1>Cities</h1>
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
                alert(JSON.stringify(response));
                this.setState({categories: JSON.parse(JSON.stringify(response))});
            });
    }

    render() {
        if (!this.state.categories){
            return <div>Loading...</div>
        }
        return (
            <div className="list-group">
                {
                    this.state.categories.map(category =>
                        <button type="button"
                                className="list-group-item list-group-item-action">
                            {category.name}</button>)
                }
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
                        <div className="row ">
                            <div className="media">
                                <img src="..." className="rounded" alt="Картинка"/>
                                <div className="media-body">
                                    <h4>{this.props.currentUser.name}</h4>
                                    <p class="lead">Администратор</p>
                                    <p class="lead">Email: {this.props.currentUser.email}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='profile-content'>
                <div className="row ">
                    <div className="container">
                        <div class="row justify-content-center">
                        <button type="button" className="btn btn-outline-dark"
                                onClick={() => this.handleClick("users")}>Пользователи</button>
                        <button type="button" className="btn btn-outline-dark"
                                onClick={() => this.handleClick("events")}>События</button>
                        <button type="button" className="btn btn-outline-dark"
                                onClick={() => this.handleClick("categories")}>Категории</button>
                        <button type="button" className="btn btn-outline-dark"
                                onClick={() => this.handleClick("cities")}>Города</button>
                        </div>
                    </div>
                </div>
                    </div>

                <div className="row">
                    <div className="container">
                        <div className='profile-content'>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Recipient's username"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">Найти</button>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>

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
        )
    }
}