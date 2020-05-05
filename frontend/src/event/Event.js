import React, {Component} from 'react';
import './Event.css';

class EventNavBar extends Component {
    render() {
        return (
            <div className="event-nav sticky-top">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="nav-link" href="#description">Описание</a>
                    <a className="nav-link" href="#comments">Отзывы</a>
                    <a className="nav-link" href="#schedule">Афиша</a>
                </nav>
            </div>
        )
    }
}

class EventHeader extends Component {
    render() {
        return (
            <div className="event-header">

                <div className="left height=160">
                    <img alt="Картинка" className="img-fluid"
                         src="https://cdn.bileter.ru/data/shows_logos/1/K/9e6SvYNnX56V8YQmHnrG_al_FmJQIW8G.jpg"
                    />
                </div>

                <div className="right">
                    <div className="genres-tag">
                        <div className="genres-tag-item d-inline mr-2">Кино</div>
                        <div className="genres-tag-item d-inline">Санкт-Петербург</div>
                    </div>

                    <h2 className="event-header-title">Длинное название
                        мероприятия раз два три четыре пят   мероприятия раз два три четыре
                    </h2>

                    <div className="buy-content">
                        <div className="dropdown mr-2">
                            <button className="btn btn-primary-outline dropdown-toggle " type="button"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                Выберете дату
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Дата1</a>
                                <a className="dropdown-item" href="#">Дата2</a>
                                <a className="dropdown-item" href="#">Дата3</a>
                            </div>
                        </div>

                        <button className="btn btn-primary">Купить</button>
                    </div>

                </div>
            </div>
        )
    }
}

class EventPictures extends Component {
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
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
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
    render() {
        return (
            <div className="event-description" id="description">
                <div className="event-description-header">
                    Описание
                </div>

                <div className="event-description-content">
                    <p>Серия фильмов о Гарри Поттере — серия фильмов, основанных на книгах о
                        Гарри Поттере английской писательницы Дж. К. Роулинг.
                        Серия выпущена компанией Warner Bros. и состоит из 8 фильмов в жанре фэнтези,
                        включая основную серию — начиная с «Гарри Поттер и философский камень» (2001)
                        и заканчивая «Гарри Поттер и Дары Смерти. Часть 2» (2011) —
                        а также спин-офф «Фантастические твари и где они обитают» и его сиквел
                        «Фантастические твари: Преступления Грин-де-Вальда».</p>
                    <p><strong>Категория:</strong> Здесь категория</p>
                </div>
            </div>
        )
    }
}

class EventComments extends Component {
    render() {
        return (
            <div className="event-comments" id="comments">

            </div>
        )
    }

}

class EventSchedule extends Component {
    render() {
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
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                        <div className="event-schedule-item">

                            <div className="event-schedule-item-date-col">
                                <div className="event-schedule-item-date">
                                    <div className="schedule-date_date">
                                        16
                                    </div>
                                    <div className="schedule-date_month">
                                        Мая
                                    </div>
                                </div>
                            </div>

                            <div className="event-schedule-item-time-col">
                                <div className="event-schedule-session">
                                    <div className="event-schedule-session-time">
                                        15:30
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

                            <div className="event-schedule-item-ticket-col">
                                <div className="box one">
                                    <button type="button" className="btn btn-primary">Купить билет</button>
                                    <div className="price">билеты по 799 р.</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class Event extends Component {
    render() {
        return (
            <div className="container">

                <EventNavBar />

                <div className="event-content">

                    <EventHeader />

                    <EventDescription />

                    <EventPictures />

                    <EventComments />

                    <EventSchedule />

                </div>

            </div>
        )
    }
}

export default Event