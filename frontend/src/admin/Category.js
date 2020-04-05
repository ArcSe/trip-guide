import React, {Component} from 'react';
import './Category.css';
import {signup} from "../util/APIUtils";
import Alert from "react-s-alert";

class Category extends Component {
    
    render() {
        return (
            <div className="container">
                <div className="content">
                    <h1 className="title">Add new category</h1>
                    <AddForm {...this.props} />
                </div>
            </div>
        )
    }
}
class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
            .then(response => {
                Alert.success("You're successfully registered. Please login to continue!");
                this.props.history.push("/login");
            }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name"
                           className="form-control" placeholder="Name"
                           value={this.state.name} onChange={this.handleInputChange} required/>
                </div>

                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" > Add</button>
                </div>
            </form>

        );
    }
}
export default Category;