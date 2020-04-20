import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';
import {getCategories, getCities, getEvents} from "../util/APIUtils";

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
                this.props.setFilterState("loadingCity", false);
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
                this.props.setFilterState("loadingCategory", false);
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
            events: [],
        };

        this.getEvents = this.getEvents.bind(this);
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        console.log("Get events started");
        let eventsRequest = {};
        let cityId = this.props.st.filters.city ? this.props.st.filters.city.id : null;
        let categoryId = this.props.st.filters.category ? this.props.st.filters.category.id : null;
        let rating = this.props.st.filters.rating ? this.props.st.filters.rating.value : null;
        eventsRequest.pageable = this.props.st.pageable;
        eventsRequest.filters = {
            cityId: cityId,
            categoryId: categoryId,
            rating: rating,
            dayOfWeek: this.props.st.dayOfWeek,
            minPrice: this.props.st.maxPrice,
            maxPrice: this.props.st.minPrice,
            free: this.props.st.free,
            notvisited: this.props.st.notvisited,
        };

        getEvents(eventsRequest)
            .then(response => {
            this.props.setPageState("totalPages", response.totalPages);
            this.setState({events: response.content});
            console.log("Events response");
            console.log(response.content);
        }).catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <button onClick={this.getEvents}>Фильтровать</button>
                {this.state.events.map(event =>
                    <div className="card mb-1">
                        <div className="row mb-1 mt-1">
                            <div className="col-md-2">
                                <img alt="Здесь должна быть картинка"
                                     src="https://evonexus.org/wp-content/uploads/2013/12/dummy-200x200.png"
                                     />
                            </div>
                            <div className="col-md-10 px-3">
                                <div className="card-block px-3">
                                    <h4 className="card-title">{event.name}</h4>
                                    <p className="card-text m-0">Рейтинг: {event.rating} (количество оценок)</p>
                                    <p className="card-text m-0">Адрес: {event.address}</p>
                                    <p className="card-text m-0">Дата: 22 сентября, вторник, 20:00</p>
                                    <p className="card-text">Цена: {event.price}</p>

                                    <p className="card-text">Что будет если тут есть
                                        очень длинное описание которое мы хотим вывести раз два три как это будет
                                        смотреться даввйте посмотрим раз два три четыре пять это нужно чтобы
                                        правильно выставить col-md пусть текст будет очень длинный привет
                                        меня зовут денис как дела</p>
                                    <a href="#" className="btn btn-primary">Посмотреть</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                city: null,
                category: null,
                rating: null,
                dayOfWeek: null,
                minPrice: null,
                maxPrice: null,
                free: false,
                notvisited: false,
                loadingCategory: true,
                loadingCity: true,
            },
            pageable: {
                page: 0,
                size: 10,
                total: null,
            },
        };

        this.setFilterState = this.setFilterState.bind(this);
        this.setPageState = this.setPageState.bind(this);
    }

    setFilterState(key, value) {

        this.setState({
            filters: {
                ...this.state.filters,
                [key]: value,
            }
        });
    }

    setPageState(key, value) {
        this.setState({
            pageable: {
                ...this.state.pageable,
                [key]: value,
            }
        });
    }

    render() {
        console.log(`loadingCategories=${this.state.filters.loadingCategory}, loadingCities=${this.state.filters.loadingCity}`)
        return (
            <div className="container">
                <div className="filter-bar">
                    <FilterComponent filterState={this.state.filters} setFilterState={this.setFilterState}/>
                </div>

                <div className="events">
                    {
                        (!this.state.filters.loadingCategory && !this.state.filters.loadingCity) ?
                            <Content st={this.state} setPageState={this.setPageState} /> : null
                    }
                </div>
            </div>
        )
    }
}