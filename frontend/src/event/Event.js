import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import EventAPI from "../util/EventAPI";
import ScheduleAPI from "../util/ScheduleAPI";
import Lightbox from "react-lightbox-component";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";

import './Event.css';
import APIUtils from "../util/APIUtils";

class EventNavBar extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="event-nav sticky-top">
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

                <div className="left height=160">
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
                <EventPicturesT />
            </SimpleReactLightbox>
        )
    }

}

class EventPicturesT extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SRLWrapper options={options}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash17.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid height=160"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash17.jpg"
                                     alt="A small boat"
                                />
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg"
                                     alt="Penguins kissed by the sun"
                                />
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                                     alt="Penguins kissed by the sun"
                                />
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash05.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash05.jpg"
                                     alt="A peaceful lake."
                                />
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash20.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash20.jpg"
                                     alt="A peaceful lake."
                                />
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash21.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash21.jpg"
                                     alt="Small insect"
                                />
                            </a>
                        </div>

                        <div className="col-lg-3 col-md-4 col-6">
                            <a
                                href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                                data-attribute="SRL"
                                className="pseudo-element"
                            >
                                <img className="img-fluid"
                                     src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                                     alt="Penguins kissed by the sun"
                                />
                            </a>
                        </div>

                    </div>
                </div>
            </SRLWrapper>
        )
    }
}

class EventPicturesT1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SRLWrapper options={options}>
                    <div id="gallery-with-links" className="container content">
                        <div className="row">
                            <div className="col-md-4 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash17.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid height=160"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash17.jpg"
                                        alt="A small boat"
                                    />
                                </a>
                            </div>
                            <div className="col-md-4 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash19.jpg"
                                        alt="Penguins kissed by the sun"
                                    />
                                </a>
                            </div>
                            <div className="col-md-4 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash04.jpg"
                                        alt="Penguins kissed by the sun"
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash05.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash05.jpg"
                                        alt="A peaceful lake."
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash20.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash20.jpg"
                                        alt="A peaceful lake."
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash21.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash21.jpg"
                                        alt="Small insect"
                                    />
                                </a>
                            </div>
                            <div className="col-md-3 col-6 col-image-with-link">
                                <a
                                    href="https://www.simple-react-lightbox.dev/docs/gallery/unsplash22.jpg"
                                    data-attribute="SRL"
                                    className="pseudo-element"
                                >
                                    <img className="img-fluid"
                                        src="https://www.simple-react-lightbox.dev/docs/gallery/unsplash22.jpg"
                                        alt="Desert lizard"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </SRLWrapper>
            </div>
        )
    }
}


class EventPicturesCarousel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="event-pictures">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100"
                                 src="https://cdn.bileter.ru/data/shows_logos/1/K/9e6SvYNnX56V8YQmHnrG_al_FmJQIW8G.jpg"
                                 alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100"
                                 src="https://cdn.bileter.ru/data/shows_images/w/H/Iy5PP8m-nVAVExdn5avnhx3ZQJSiy88e.jpg"
                                 alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100"
                                 src="https://cdn.bileter.ru/data/shows_logos/1/K/9e6SvYNnX56V8YQmHnrG_al_FmJQIW8G.jpg"
                                 alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        b<span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
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
                                            <button type="button" className="btn btn-primary">Купить билет</button>
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