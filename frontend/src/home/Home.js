import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';
import {getCategories, getCities} from "../util/APIUtils";

class CityDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: null,
            loading: true,
        };

        this.getCities = this.getCities.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    getCities() {
        const citiesRequest = {page: null, size: null};
        getCities(citiesRequest)
            .then(response => {
                const cities = response.content;
                this.setState({cities: cities});
                this.props.setFilterState("city", cities[0]);
                this.setState({loading: false});
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="cityDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.city ? this.props.city.name : "Город"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                        this.state.cities.map(city =>
                            <button className="dropdown-item"
                                    type="button"
                                    onClick={() => this.props.setFilterState("city", city)}>{city.name}</button>)
                    }
                </div>
            </div>
        )
    }
}

class DateSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-inline">
                <div className="btn-toolbar justify-content-between" role="toolbar"
                     aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <button type="button" className="mr-2 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("preset", null)}>Все</button>
                        <button type="button" className="mr-2 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("preset", "today")}>Сегодня</button>
                        <button type="button" className="mr-2 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("preset", "tomorrow")}>Завтра</button>
                        <button type="button" className="mr-2 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("preset", "weekend")}>На выходных</button>
                    </div>
                </div>

            </form>
        )

    }

}

class CategoryDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            loading: true,
        };

        this.getCategories = this.getCategories.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        const categoriesRequest = {page: null, size: null,};
        getCategories(categoriesRequest)
            .then(response => {
                this.setState({categories: response.content});
                this.setState({loading: false});
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="categoryDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.category ? this.props.category.name : "Категория"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownCategoryManu">

                    <button className="dropdown-item"
                            type="button" onClick={() => this.props.setFilterState("category", null)}>Очистить</button>
                    {
                        this.state.categories.map(category =>
                            <button className="dropdown-item"
                                    type="button" onClick={() => this.props.setFilterState("category", category)}>
                                {category.name}</button>)
                    }
                </div>
        </div>)
    }
}

class RatingDropDown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dropdown ml-2">
                <button className="btn btn-primary dropdown-toggle" type="button" id="cityDropDownButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.rating ? this.props.rating.name : "Рейтинг"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item"
                            type="button" onClick={() => this.props.setFilterState("rating", null)}>Очистить</button>
                    <button className="dropdown-item"
                            type="button"
                            onClick={() => this.props.setFilterState("rating", {name: "4+", value: 4})}>4+</button>
                    <button className="dropdown-item"
                            type="button"
                            onClick={() => this.props.setFilterState("rating", {name: "3+", value: 3})}>3+</button>
                </div>
            </div>
        )
    }
}

class FilterCheckBox extends Component {
    constructor(props) {
        super(props);

        this.handleFreeChange = this.handleFreeChange.bind(this);
        this.handleNotVisitedChange = this.handleNotVisitedChange.bind(this);
    }

    handleFreeChange() {
        this.props.setFilterState("free", !this.props.free);
    }

    handleNotVisitedChange() {
        this.props.setFilterState("notvisited", !this.props.notvisited);
    }

    render() {
        return (
            <form className="form-inline">
                <div className="form-check ml-2">
                    <input type="checkbox" className="form-check-input"
                           id="notVisitedCheck"
                           onChange={this.handleNotVisitedChange} checked={this.props.notvisited}/>
                    <label className="form-check-label" htmlFor="notVisitedCheck">Не посетил</label>
                </div>

                <div className="form-check ml-2">
                    <input type="checkbox" className="form-check-input"
                           id="freeCheck"
                           onChange={this.handleFreeChange} checked={this.props.free}/>
                    <label className="form-check-label" htmlFor="freeCheck">Бесплатные</label>
                </div>
            </form>
        )
    }
}

class FilterSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-inline">

                <CategoryDropDown category={this.props.category}
                    setFilterState={this.props.setFilterState}/>

                <RatingDropDown rating={this.props.rating}
                    setFilterState={this.props.setFilterState}/>

                <FilterCheckBox free={this.props.free}
                                notvisited={this.props.notvisited}
                    setFilterState={this.props.setFilterState}/>
            </form>
        )
    }
}

class FilterComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <div className="city-bar mb-2 ml-1 row align-items-center">
                    <CityDropDown city={this.props.filterState.city}
                                  setFilterState={this.props.setFilterState} />
                </div>

                <div className="date-bar mb-2 ml-1 row align-items-center">
                    <DateSelector setFilterState={this.props.setFilterState}
                                  date={this.props.date} preset={this.props.preset}/>
                </div>

                <div className="filter-bar row ml-1 mb-2 align-items-center">
                    <FilterSelector category={this.props.filterState.category}
                                    rating={this.props.filterState.rating}
                                    free={this.props.filterState.free}
                                    notvisited={this.props.filterState.notvisited}
                        setFilterState={this.props.setFilterState} />
                </div>
            </div>
        )
    }
}

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: null,
        };

        this.getCities = this.getCities.bind(this);
    }

    getCities() {

    }

    render() {
        return (
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
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: null,
            category: null,
            rating: null,
            preset: null,
            date: null,
            free: false,
            notvisited: false,
        };

        this.setFilterState = this.setFilterState.bind(this);
    }

    setFilterState(key, value) {
        this.setState({[key]: value});
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <div className="filter-bar">
                    <FilterComponent filterState={this.state} setFilterState={this.setFilterState}/>
                </div>

                <div className="events">
                    <Content filterState={this.state} />
                </div>
            </div>
        )
    }
}