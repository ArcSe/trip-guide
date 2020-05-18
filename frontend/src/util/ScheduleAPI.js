import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class ScheduleAPI  {

    getSchedulesByEvent(scheduleRequest) {
        const eventId = scheduleRequest.eventId;
        const page = scheduleRequest.page ? scheduleRequest.page : 0;
        const size = scheduleRequest.size ? scheduleRequest.size : -1;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/schedule?eventId=${eventId}&page=${page}&size=${size}`,
            method: `GET`
        });
    }

    getScheduleById(scheduleRequest) {
        const id = scheduleRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/schedule/${id}`,
            method: 'GET'
        });
    }

    getSchedule(scheduleRequest) {
        this.checkAccessToken();

        const page = scheduleRequest.page;
        const size = scheduleRequest.size;
        const eventId = scheduleRequest.eventId;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/schedule/event/${eventId}?page=${page}&size=${size}`,
            method: 'GET'
        });
    }

    createSchedule(scheduleRequest) {
        this.checkAccessToken();

        return APIUtils.request({
            url: `${API_BASE_URL}/api/schedule`,
            method: 'POST',
            body: JSON.stringify(scheduleRequest)
        });
    }

    editSchedule(scheduleRequest) {
        this.checkAccessToken();
        const eventId = scheduleRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/schedule/${eventId}`,
            method: 'PUT',
            body: JSON.stringify(scheduleRequest)
        });
    }

    deleteSchedule(scheduleId) {
        this.checkAccessToken();

        return APIUtils.request2({
            url: `${API_BASE_URL}/api/schedule/${scheduleId}`,
            method: 'DELETE'
        });
    }

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new ScheduleAPI()