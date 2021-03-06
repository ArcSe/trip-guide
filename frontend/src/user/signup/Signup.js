import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import UserAPI from "../../util/UserAPI";
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Регистрация в Trip Guide</h1>
                    <SignupForm {...this.props} />
                    <span className="login-link">Уже есть аккаунт? <Link to="/login">Войти!</Link></span>
                </div>
            </div>
        );
    }
}


class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Sign up with Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Sign up with Facebook</a>
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Sign up with Github</a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
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

        UserAPI.signup(signUpRequest)
        .then(response => {
            Alert.success("Вы успешно зарегистрированы. Пожалуйста, войдите, чтобы продолжить!");
            this.props.history.push("/login");
        }).catch(error => {
            if ('errors' in error) {
                error.errors.map(obj => Alert.error(obj.defaultMessage));
            } else {
                Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name"
                        className="form-control" placeholder="Имя"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Пароль" pattern="[0-9a-zA-Z]{6,}"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="confirmPassword"
                           className="form-control" placeholder="Подтвердите пароль" pattern="[0-9a-zA-Z]{6,}"
                           value={this.state.confirmPassword} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Зарегистрироваться</button>
                </div>
            </form>                    

        );
    }
}

export default Signup