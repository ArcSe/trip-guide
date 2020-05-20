import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../admin/Admin.css'
import {Cities} from './Cities'
import {Categories} from './Categories'
import {Events} from './Events'
import userLogo from "../img/user.jpg";
import {Button} from "react-bootstrap";
import UserAPI from "../util/UserAPI";

class AdminInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isLoad: false,
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.changeTheButton = this.changeTheButton.bind(this);
    }
    changeTheButton(){

    }

    fileChangedHandler = event => {
        this.setState({isLoad: !this.state.isLoad})
        this.setState({selectedFile: event.target.files[0]})
    };

    uploadHandler = () => {

        const loadRequest = {userId: this.props.currentUser.id, file: this.state.selectedFile};

        UserAPI.loadPhoto(loadRequest);
    };

    render() {
        return (
            <div className='profile-container'>
                <div className="media-container ">
                    <div className="media">
                        <img src={userLogo} className="rounded img" alt="img" width="150" height="150"/>
                        <div className="media-body-left">
                            <h4>{this.props.currentUser.name}</h4>
                            <p className="lead">Администратор</p>
                            <p className="lead">Email: {this.props.currentUser.email}</p>
                        </div>
                    </div >
                    <form method="POST" encType="multipart/form-data">
                        {this.state.isLoad ?
                            <button onClick={this.uploadHandler}>Загрузить</button>
                            :
                            <input type="file" onChange={this.fileChangedHandler}/>
                        }
                    </form>
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
            <div className="profile-button ml-sm-2" >
                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
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
            <div className="profile-button ">
                <div className="row">
                    <div className="container">
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
            currentTab: "events",
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