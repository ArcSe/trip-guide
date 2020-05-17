import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import EventAPI from "../util/EventAPI";
import ScheduleAPI from "../util/ScheduleAPI";
import Lightbox from "react-lightbox-component";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";

import './Event.css';
import APIUtils from "../util/APIUtils";
import ImageAPI from "../util/ImageAPI";
import {API_BASE_URL} from "../constants";

class EventNavBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="event-nav">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="nav-link" href="#description">Описание</a>
                    <a className="nav-link" href="#schedule">Афиша</a>
                </nav>
            </div>
        )
    }
}

class EventHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schedules: [],
            loading: true
        };

        this.getSchedules = this.getSchedules.bind(this);
    }

    componentDidMount() {
        this.getSchedules();
    }

    getSchedules() {
        const schedulesRequest = { eventId: this.props.event.id };
        ScheduleAPI.getSchedulesByEvent(schedulesRequest)
            .then(response => {
                this.setState({schedules: response.content});
                this.setState({loading: false});
            })
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const category = this.props.event.category.name;
        const city = this.props.event.city.name;
        const name = this.props.event.name;

        return (
            <div className="event-header">

                <div className="left">
                    <img alt="Картинка" className="img-fluid"
                         src="https://cdn.bileter.ru/data/shows_logos/1/K/9e6SvYNnX56V8YQmHnrG_al_FmJQIW8G.jpg"
                    />
                </div>

                <div className="right">
                    <div className="genres-tag">
                        <div className="genres-tag-item d-inline">{city}</div>
                    </div>

                    <h2 className="event-header-title">{name}</h2>

                    <div className="buy-content">
                        <p><strong>Категория: </strong>{category}</p>
                    </div>

                </div>
            </div>
        )
    }
}

const options = {
    buttons: {
        backgroundColor: 'rgba(140, 94, 88, 0.8)',
        iconColor: 'rgba(241, 191, 152, 0.7)'
    },
    settings: {
        overlayColor: 'rgba(255, 237, 225, 0.95)',
        showThumbnails: false,
        transitionSpeed: 1000,
        transitionTimingFunction: 'linear'
    },
    caption: {
        showCaption: false
    }
};

class EventPictures extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SimpleReactLightbox>
                <EventPicturesContent event={this.props.event} />
            </SimpleReactLightbox>
        )
    }

}

class EventPicturesContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            loading: true,
        };

        this.getPhotos = this.getPhotos.bind(this);
    }

    componentDidMount() {
        this.getPhotos();
    }

    getPhotos() {
        const id = this.props.event.id;
        const imageRequest = { id: id };
        ImageAPI.getPhotos(imageRequest)
            .then(response => {
                this.setState({photos: response.response });
                this.setState({loading: false});
                this.state.photos.map(photo => console.log(`${API_BASE_URL}/img/${photo}`));
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <SRLWrapper options={options}>
                <div className="container">
                    <div className="row justify-content-center">

                        {
                            this.state.photos.map(photo =>
                                <div>
                                    <a className="m-1"
                                        href={`${API_BASE_URL}/img/${photo}`}
                                        data-attribute="SRL"
                                        className="pseudo-element"
                                    >
                                        <img className="img-relative" width="200" height="200"
                                             src={`${API_BASE_URL}/img/${photo}`}
                                             alt="Photo"
                                        />
                                    </a>
                                </div>
                            )
                        }

                    </div>
                </div>
            </SRLWrapper>
        )
    }
}

class EventDescription extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let description = this.props.event.description;
        let category = this.props.event.category.name;

        return (
            <div className="event-description" id="description">
                <div className="event-description-header">
                    Описание
                </div>

                <div className="event-description-content">
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

class EventComments extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="event-comments" id="comments">

            </div>
        )
    }

}

class EventSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schedules: [],
            loading: true,
        };

        this.getSchedules = this.getSchedules.bind(this);
    }

    componentDidMount() {
        this.getSchedules();
    }

    getSchedules() {
        const schedulesRequest = { eventId: this.props.eventId };
        ScheduleAPI.getSchedulesByEvent(schedulesRequest)
            .then(response => {
                this.setState({schedules: response.content});
                this.setState({loading: false});
            })
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div className="event-schedule" id="schedule">
                <div className="event-schedule-header">
                    <div className="event-schedule-header-line">
                        <div className="event-schedule-header-line-title">
                            Афиша
                        </div>
                    </div>
                </div>

                <div className="event-schedule-list">
                    <div className="event-schedule-list-inner block">

                        {
                            this.state.schedules.map(schedule =>

                                <div className="event-schedule-item">

                                    <div className="event-schedule-item-date-col">
                                        <div className="event-schedule-item-date">
                                            <div className="schedule-date_date">
                                                {schedule.day}
                                            </div>
                                            <div className="schedule-date_month">
                                                {schedule.month}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-schedule-item-time-col">
                                        <div className="event-schedule-session">
                                            <div className="event-schedule-session-time">
                                                {schedule.time}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-schedule-item-info-col">
                                        <div className="event-schedule-session-place">
                                            <div className="event-address">
                                                ул. Победы, д. 42
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-schedule-item-price-col">
                                        <div className="event-schedule-session-price">
                                            <div className="event-price">
                                                {schedule.price}&#8381;
                                            </div>
                                        </div>
                                    </div>

                                    <div className="event-schedule-item-ticket-col">
                                        <div className="box one">
                                            <a href="/buy">
                                            <button type="button" className="btn btn-primary">
                                                Купить билет
                                            </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }

}

class EventContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: null,
            loading: true,
        };

        this.getEvent = this.getEvent.bind(this);
    }

    componentDidMount() {
        this.getEvent();
    }

    getEvent() {
        const eventRequest = {eventId: this.props.eventId};
        EventAPI.getEventById(eventRequest)
            .then(response => {
                this.setState({event: response});
                this.setState({loading: false});
            });

    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div>
                <EventHeader event={this.state.event} />

                <EventDescription event={this.state.event} />

                <EventPictures event={this.state.event} />
            </div>
        )
    }
}

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: null,
            loading: false,
        };

        this.getEventId = this.getEventId.bind(this);
    }

    componentDidMount() {
        this.getEventId();
    }

    getEventId() {
    }

    render() {
        const eventId = this.props.match.params.id;

        return (
            <div className="container">

                <EventNavBar />

                <div className="event-content">

                    <EventContent eventId={eventId} />

                    <EventComments />

                    <EventSchedule eventId={eventId} />

                </div>

            </div>
        )
    }
}

export default withRouter(Event)