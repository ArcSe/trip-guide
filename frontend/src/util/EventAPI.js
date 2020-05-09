import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class EventAPI  {

    getEvent(eventRequest) {
        const eventId = eventRequest.eventId;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event/${eventId}`,
            method: `GET`
        });
    }

    // Зачем это???
    getEvents1(eventsRequest) {
        const page = eventsRequest.page;
        const size = eventsRequest.size;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event/?page=${page}&size=${size}`,
            method: 'GET'
        });
    }

    getEvents(eventsRequest) {
        const pageable = eventsRequest.pageable;
        const filters = eventsRequest.filters;
        const pageableParams = Object.keys(pageable).map(key =>
            key + '=' + (pageable[key] ? pageable[key] : "")).join('&');
        const filtersParams = Object.keys(filters).map(key =>
            key + '=' + (filters[key] ? filters[key] : "")).join('&');

        console.log("Запрос EventAPI.getEvents: "
            + `${API_BASE_URL}/api/events/?${pageableParams}&${filtersParams}`);

        return APIUtils.request({
            url: `${API_BASE_URL}/api/events/?${pageableParams}&${filtersParams}`,
            method: 'GET'
        });
    }

    createEvent(eventRequest) {
        this.checkAccessToken();

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event`,
            method: 'POST',
            body: JSON.stringify(eventRequest)
        });
    }

    getEventsByName(eventsRequest) {
        this.checkAccessToken();
        const name = eventsRequest.name;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event/?name=${name}`,
            method: 'GET'
        });
    }

    editEvent(eventRequest) {
        this.checkAccessToken();
        const eventId = eventRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event/${eventId}`,
            method: 'PUT',
            body: JSON.stringify(eventRequest)
        });
    }


    deleteEvent(eventId) {
        this.checkAccessToken();

        return APIUtils.request2({
            url: `${API_BASE_URL}/api/event/${eventId}`,
            method: 'DELETE'
        });
    }

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new EventAPI()