import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div className="container">
                <div className="city-bar mb-2 ml-1 row align-items-center">

                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="cityDropDownButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Город
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item">Москва</a>
                            <a className="dropdown-item">Санкт-Петербург</a>
                            <a className="dropdown-item">Пермь</a>
                        </div>
                    </div>

                </div>

                <div className="date-bar mb-2 ml-1 row align-items-center">

                    <div className="btn-toolbar justify-content-between" role="toolbar"
                         aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="First group">
                            <button type="button" className="mr-2 btn btn-outline-dark">Все</button>
                            <button type="button" className="mr-2 btn btn-outline-dark">Сегодня</button>
                            <button type="button" className="mr-2 btn btn-outline-dark">Завтра</button>
                            <button type="button" className="mr-2 btn btn-outline-dark">На выходных</button>
                        </div>
                    </div>

                    <DatePicker  selected={this.state.startDate}  onChange={this.handleChange}/>

                </div>

                <div className="filter-bar row ml-1 mb-2 align-items-center">

                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="categoryDropDownButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Категория
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item">Музей</a>
                            <a className="dropdown-item">Театр</a>
                            <a className="dropdown-item">Кино</a>
                        </div>
                    </div>

                    <div className="dropdown ml-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="cityDropDownButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Рейтинг
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item">5</a>
                            <a className="dropdown-item">4+</a>
                            <a className="dropdown-item">3+</a>
                        </div>
                    </div>

                    <div className="form-check ml-2">
                        <input type="checkbox" className="form-check-input" id="notVisitedCheck"/>
                        <label className="form-check-label" htmlFor="notVisitedCheck">Не посетил</label>
                    </div>

                    <div className="form-check ml-2">
                        <input type="checkbox" className="form-check-input" id="freeCheck"/>
                        <label className="form-check-label" htmlFor="freeCheck">Бесплатные</label>
                    </div>


                </div>


                <div className="events">

                    <div className="card mb-1">
                        <div className="row mb-1 mt-1">
                            <div className="col-md-4">
                                <img alt="Здесь должна быть картинка"
                                     src="https://www.jotform.com/resources/assets/icon/min/jotform-icon-dark-400x400.png"
                                     className="w-100" />
                            </div>
                            <div className="col-md-8 px-3">
                                <div className="card-block px-3">
                                    <h4 className="card-title">Lorem ipsum dolor sit amet</h4>
                                    <p className="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                    <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <a href="#" className="btn btn-primary">Посмотреть</a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="card mb-1">
                        <div className="row mb-1 mt-1">
                            <div className="col-md-4">
                                <img alt="Здесь должна быть картинка"
                                     src="https://cdn1.tu-tu.ru/static/platform2/aviacore-static/icons/open-graph-image-400x400.png"
                                     className="w-100" />
                            </div>
                            <div className="col-md-8 px-3">
                                <div className="card-block px-3">
                                    <h4 className="card-title">Lorem ipsum dolor sit amet</h4>
                                    <p className="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                    <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <a href="#" className="btn btn-primary">Посмотреть</a>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>

            </div>

        )
    }
}

export default Home;