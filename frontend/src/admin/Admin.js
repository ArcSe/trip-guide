import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'


import {ButtonToolbar, ButtonGroup, Button, Container, Row, Col} from "react-bootstrap";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import {getCategories, getCurrentUser} from "../util/APIUtils";

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
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
                        <button type="button" className="btn btn-outline-dark" onClick={this.onClick}>Пользователи</button>
                        <button type="button" className="btn btn-outline-dark">События</button>
                        <button type="button" className="btn btn-outline-dark">Категории</button>
                        <button type="button" className="btn btn-outline-dark">Города</button>
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
                        <ul className="list-group">
                            <li className="list-group-item active">Первое</li>
                            <li className="list-group-item">Второе</li>
                            <li className="list-group-item">Третье</li>
                            <li className="list-group-item">Четвертое</li>
                            <li className="list-group-item">Пятое</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}