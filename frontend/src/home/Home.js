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
                    {this.props.city.name ? this.props.city.name : "Город"}
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
                        <button type="button" className="mr-1 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("dayOfWeek", null)}>Все</button>
                        <button type="button" className="mr-1 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("dayOfWeek", "today")}>Сегодня</button>
                        <button type="button" className="mr-1 btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("dayOfWeek", "tomorrow")}>Завтра</button>
                        <button type="button" className="btn btn-outline-dark"
                                onClick={() => this.props.setFilterState("dayOfWeek", "weekend")}>На выходных</button>
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
                    {this.props.category.name ? this.props.category.name : "Категория"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownCategoryManu">

                    <button className="dropdown-item"
                            type="button" onClick={() => this.props.setFilterState("category", {id: null, value: null})}>Очистить</button>
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
                    {this.props.rating.name ? this.props.rating.name : "Рейтинг"}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item"
                            type="button" onClick={() => this.props.setFilterState("rating", {name: null, value: null})}>Очистить</button>
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
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                <div className="btn-group mr-2" role="group" aria-label="First group">
                    <CityDropDown city={this.props.filterState.city}
                                  setFilterState={this.props.setFilterState} />
                </div>

                <div className="btn-group mr-2" role="group" aria-label="Second group">
                    <DateSelector setFilterState={this.props.setFilterState}
                                  date={this.props.date} preset={this.props.preset}/>
                </div>

                <div className="btn-group mr-2" role="group" aria-label="Third group">
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

        eventsRequest.pageable = this.props.st.pageable;
        eventsRequest.filters = {
            cityId: this.props.st.filters.city.id,
            categoryId: this.props.st.filters.category.id,
            rating: this.props.st.filters.value,
            dayOfWeek: this.props.st.filters.dayOfWeek,
            minPrice: this.props.st.filters.maxPrice,
            maxPrice: this.props.st.filters.minPrice,
            free: this.props.st.filters.free,
            notvisited: this.props.st.filters.notvisited,
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
                <button type="button" className="btn btn-primary mt-1 mb-1" onClick={this.getEvents}>Фильтровать</button>
                {this.state.events.map(event =>
                    <div className="row no-gutters border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
                        <div className="col-auto d-lg-block my-auto">
                            <svg className="bd-placeholder-img" width="250" height="200"
                                 preserveAspectRatio="xMidYMid slice"
                                 focusable="false" role="img" aria-label="Placeholder: Thumbnail">
                                <rect width="100%" height="100%" fill="#55595c"/>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">Картинка</text>
                            </svg>
                        </div>
                        <div className="col p-4  position-static">
                            <h3 className="mb-0">{event.name}</h3>
                            <div className="mb-0 text-muted">
                                Рейтинг: {event.rating} ({event.votes})
                                Моя оценка: аа
                            </div>
                            <div className="text-muted">{event.address}, ближайшая дата {event.date[0]}</div>
                            <p className="card-text mb-auto">
                                {event.description.length > 200 ?
                                    `${event.description.substring(0, 200)}...` : event.description}</p>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Посетил
                                </label>
                            </div>

                            <a href="#" className="card-link">Перейти</a>
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
                city: {id: null, name: null},
                category: {id: null, name: null},
                rating: {name: null, value: null},
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