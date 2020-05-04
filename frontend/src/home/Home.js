import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "react-datepicker/dist/react-datepicker.css";
import './Home.css';
import CategoryAPI from "../util/CategoryAPI";
import CityAPI from "../util/CityAPI";
import UserAPI from "../util/UserAPI";
import EventAPI from "../util/EventAPI";
import Alert from "react-s-alert";
import RatingAPI from "../util/RatingAPI";

class CityDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            loading: true,
        };

        this.getCities = this.getCities.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    getCities() {
        const citiesRequest = {page: null, size: null};
        CityAPI.getCities(citiesRequest)
            .then(response => {
                const cities = response.content;
                this.setState({cities: cities});
                console.log(cities);
                this.props.setFilterState("city", cities[0]);
                this.props.setFilterState("loadingCity", false);
                this.setState({loading: false});
            })
            .catch(error => console.log(`${error.message}`));
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
        CategoryAPI.getCategories(categoriesRequest)
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
                {
                    false &&
                    <div className="form-check ml-2">
                        <input type="checkbox" className="form-check-input"
                               id="notVisitedCheck"
                               onChange={this.handleNotVisitedChange} checked={this.props.notvisited}/>
                        <label className="form-check-label" htmlFor="notVisitedCheck">Не посетил</label>
                    </div>
                }

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
                                currentUser={this.props.currentUser}
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
                                    currentUser={this.props.currentUser}
                                    rating={this.props.filterState.rating}
                                    free={this.props.filterState.free}
                                    notvisited={this.props.filterState.notvisited}
                        setFilterState={this.props.setFilterState} />
                </div>
            </div>
        )
    }
}

class Pagination extends Component  {
    constructor(props) {
        super(props);

        this.handleBackButton = this.handleBackButton.bind(this);
        this.handleNextButton = this.handleNextButton.bind(this);
    }

    handleBackButton() {
        const page = this.props.page;

        if (page !== 0) {
            this.props.setPageState("page", page - 1);
            this.props.getEvents();
        }
    }

    handleNextButton() {
        const page = this.props.page;
        const totalPages = this.props.totalPages;

        if (page !== totalPages - 1) {
            this.props.setPageState("page", page + 1);
            this.props.getEvents();
        }
    }

    render() {
        if (this.props.totalPages <= 1) {
            return null;
        }

        return(
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                        <button type="button" className="btn btn-light"
                                onClick={this.handleBackButton}>Предыдущая</button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="btn btn-light"
                                onClick={this.handleNextButton}>Следующая</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEvents: new Set(),
            events: [],
        };

        this.getEvents = this.getEvents.bind(this);
        this.getUserEvents = this.getUserEvents.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    componentDidMount() {
        this.getEvents();
        this.getUserEvents();
    }

    getUserEvents() {
        if (this.props.currentUser) {
            this.setState({userEvents: new Set(this.props.currentUser.events.map(event => event.id))});
        } else {
            this.setState({userEvents: new Set()});
        }
    }

    getEvents() {
        let eventsRequest = {};

        eventsRequest.pageable = this.props.st.pageable;
        eventsRequest.filters = {
            cityId: this.props.st.filters.city.id,
            categoryId: this.props.st.filters.category.id,
            rating: this.props.st.filters.rating.value,
            dayOfWeek: this.props.st.filters.dayOfWeek,
            minPrice: this.props.st.filters.maxPrice,
            maxPrice: this.props.st.filters.minPrice,
            free: this.props.st.filters.free,
            notvisited: this.props.st.filters.notvisited,
        };

        EventAPI.getEvents(eventsRequest)
            .then(response => {
                this.props.setPageState("totalPages", response.totalPages);
                this.setState({events: response.content});
            }).catch(error => console.log(error));
    }

    handleCheckBoxChange(event, id) {
        /*
         Записываем в посещенные или удаляем из посещенных через несколько минут
        */

        const checked = event.target.checked;
        const userEvents = this.state.userEvents;
        const type = checked ? "add" : "delete";
        const eventRequest = {userId: this.props.currentUser.id, eventId: id, type: [type]};

        UserAPI.updateUserEvent(eventRequest)
            .then(response => {
                checked ? userEvents.add(id) : userEvents.delete(id);
                this.setState({userEvents: userEvents});
            })
            .catch(error => {
                Alert.error((error && error.message) || "Ошибка при обновлении события! Пожалуйста, попробуйте ещё раз.");
            });
    }

    handleRatingSet(evenId, rating) {
        const ratingRequest = {
            eventId: evenId,
            rating: rating,
            userId: this.props.currentUser.id};

        RatingAPI.updateRating(ratingRequest)
            .then(() => {
                Alert.success("Рейтинг поставлен");
            }).catch(error => {
            Alert.error((error && error.message) || "Упс! Что-то пошло не так. Пожалуйста, попробуйте снова!");
        });

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

                            <div className="form-inline">
                                <h3 className="mb-0">{event.name}</h3>

                                {this.props.currentUser &&
                                <div className="dropdown ml-2">

                                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Оценить
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button className="dropdown-item" type="button"
                                                onClick={() => this.handleRatingSet(event.id, 1)}>1</button>
                                        <button className="dropdown-item" type="button"
                                                onClick={() => this.handleRatingSet(event.id, 2)}>2</button>
                                        <button className="dropdown-item" type="button"
                                                    onClick={() => this.handleRatingSet(event.id, 3)}>3</button>
                                        <button className="dropdown-item" type="button"
                                                onClick={() => this.handleRatingSet(event.id, 4)}>4</button>
                                        <button className="dropdown-item" type="button"
                                                onClick={() => this.handleRatingSet(event.id, 5)}>5</button>
                                    </div>
                                </div>
                                }
                            </div>



                            <div className="mb-0 text-muted">
                                Рейтинг: {+(Math.round(event.rating + "e+2")  + "e-2")} ({event.votes})
                            </div>
                            <div className="text-muted">{event.address}, ближайшая дата</div>
                            <p className="card-text mb-auto">
                                {event.description.length > 200 ?
                                    `${event.description.substring(0, 200)}...` : event.description}
                            </p>

                            {this.props.currentUser &&
                            <div className="form-check">
                                <input className="form-check-input"
                                       type="checkbox" value="" id="defaultCheck1"
                                       checked={this.state.userEvents.has(event.id)} onChange={e => this.handleCheckBoxChange(e, event.id)}/>
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Посетил
                                </label>
                            </div>
                            }

                            <a href="#" className="card-link">Перейти</a>
                        </div>
                    </div>
                )
                }

                <Pagination totalPages={this.props.st.pageable.totalPages}
                            page={this.props.st.pageable.page}
                            setPageState={this.props.setPageState}
                            getEvents={this.getEvents}/>


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
                page: 1,
                size: 2,
                totalPages: null,
            },
        };

        this.setFilterState = this.setFilterState.bind(this);
        this.setPageState = this.setPageState.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {
       // console.log(`Home component mount with current user ${this.props.currentUser === null}`);
    }

    getCurrentUser() {
        UserAPI.getCurrentUser()
            .then(response => {
                this.setState({currentUser: response});
            }).catch(error => {
                this.setState({currentUser: null});
        });
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
        return (
            <div className="container">
                <div className="filter-bar">
                    <FilterComponent filterState={this.state.filters}
                                     currentUser={this.props.currentUser}
                                     setFilterState={this.setFilterState}/>
                </div>

                <div className="events">
                    {
                        (!this.state.filters.loadingCategory && !this.state.filters.loadingCity) ?
                            <Content st={this.state}
                                     setPageState={this.setPageState}
                                     currentUser={this.props.currentUser}/> : null
                    }
                </div>
            </div>
        )
    }
}