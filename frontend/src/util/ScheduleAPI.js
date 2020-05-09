import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class ScheduleAPI  {

    getSchedulesByEvent(scheduleRequest) {
        const eventId = scheduleRequest.eventId;
        const upcoming = scheduleRequest.upcoming ? scheduleRequest.upcoming : false;
        const page = scheduleRequest.pageable ? scheduleRequest.pageable.page : 0;
        const size = scheduleRequest.pageable ? scheduleRequest.pageable.size : -1;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/schedule?eventId=${eventId}&upcoming=${upcoming}&page=${page}&size=${size}`,
            method: `GET`
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
            url: `${API_BASE_URL}/api/schedules`,
            method: 'POST',
            body: JSON.stringify(scheduleRequest)
        });
    }

    deleteSchedule(scheduleId) {
        this.checkAccessToken();

        return APIUtils.request2({
            url: `${API_BASE_URL}/api/schedules/${scheduleId}`,
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