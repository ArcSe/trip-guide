import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class ScheduleAPI  {

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new ScheduleAPI()