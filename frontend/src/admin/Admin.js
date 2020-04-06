import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


import {ButtonToolbar, ButtonGroup, Button, Container, Row, Col} from "react-bootstrap";
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";

export default class Admin extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="media">
                        <img src="..." className="rounded" alt="Картинка"/>
                        <div className="media-body">
                            <h5 className="mt-0">Иван Иванов</h5>
                            <p>Администратор</p>
                            <p>Email: test@t.t</p>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="container">
                        <button type="button" className="btn btn-outline-primary">Пользователи</button>
                        <button type="button" className="btn btn-outline-primary">События</button>
                        <button type="button" className="btn btn-outline-primary">Категории</button>
                        <button type="button" className="btn btn-outline-primary">Города</button>
                    </div>
                </div>

                <div className="row">
                    <div className="container">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Recipient's username"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2" />

                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">Найти</button>
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