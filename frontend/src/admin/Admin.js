import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'
import {Cities} from './Cities'
import {Categories} from './Categories'
import {Users} from './Users'
import {Events} from './Events'
import userLogo from "../img/user.jpg";

class AdminInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='profile-container'>
                <div className="media-container ">
                    <div className="media">
                        <img src='../img/user.jpg' className="rounded img" alt="img" width="150" height="150"/>
                        <div className="media-body-left">
                            <h4>{this.props.currentUser.name}</h4>
                            <p className="lead">Администратор</p>
                            <p className="lead">Email: {this.props.currentUser.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Tabs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-button" >
                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <button type="button" className="ml-3 btn btn-outline-dark"
                                onClick={() => this.props.handleClick("users")}>Пользователи</button>
                        <button type="button" className="ml-2 btn btn-outline-dark"
                                onClick={() => this.props.handleClick("events")}>События</button>
                        <button type="button" className="ml-2 btn btn-outline-dark"
                                onClick={() => this.props.handleClick("categories")}>Категории</button>
                        <button type="button" className="ml-2 btn btn-outline-dark"
                                onClick={() => this.props.handleClick("cities")}>Города</button>
                    </div>
                </div>
            </div>
        )
    }
}


class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="profile-button">
                <div className="row">
                    <div className="container">
                        {(this.props.tab === "users") && <Users />}
                        {(this.props.tab === "events") && <Events />}
                        {(this.props.tab === "categories") && <Categories />}
                        {(this.props.tab === "cities") && <Cities />}
                    </div>
                </div>
            </div>
        )
    }
}

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: null,
        };

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tab) {
        this.setState({currentTab: tab});
    }

    render() {
        return (

            <div className="container">
                <AdminInformation currentUser={this.props.currentUser} />

                <Tabs handleClick={this.handleTabClick} />

                <Content tab={this.state.currentTab} />
            </div>
        )
    }
}