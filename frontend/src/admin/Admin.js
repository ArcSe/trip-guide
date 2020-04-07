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
                                <h4 class="lead">{this.props.currentUser.name}</h4>
                                <p class="lead">Администратор</p>
                                <p class="lead">Email: {this.props.currentUser.email}</p>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="form" >
                    <div className="form-group">
                        <nav className="navbar navbar-expand-lg navbar-light bg-white">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <div className="btn-group col-md-4">
                                        <button type="button" className="btn btn-outline-dark" onClick={this.onClick}>Пользователи</button>
                                    </div>
                                    <div className="btn-group col-md-4">
                                        <button type="button" className="btn btn-outline-dark">События</button>
                                    </div>
                                    <div className="btn-group col-md-4">
                                        <button type="button" className="btn btn-outline-dark">Категории</button>
                                    </div>
                                    <div className="btn-group col-md-4">
                                        <button type="button" className="btn btn-outline-dark">Города</button>
                                    </div>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                           aria-label="Search"/>
                                        <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search
                                        </button>
                                </form>
                            </div>
                        </nav>
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