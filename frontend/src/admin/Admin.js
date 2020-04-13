import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'
import {Cities} from './Cities'
import {Categories} from './Categories'
import {Users} from './Users'
import {Events} from './Events'
import {getCurrentUser} from "../util/APIUtils";
import userLogo from "../img/user.jpg";

class Empty extends React.Component {
    render() {
        return (
            <h1>Empty</h1>
        )
    }
}



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