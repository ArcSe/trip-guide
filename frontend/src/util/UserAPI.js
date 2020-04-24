import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class UserAPI {

    getCurrentUser() {
        this.checkAccessToken();

        return APIUtils.request({
            url: `${API_BASE_URL}/user/me`,
            method: 'GET'
        });
    }

    login(loginRequest) {
        return APIUtils.request({
            url: `${API_BASE_URL}/auth/login`,
            method: 'POST',
            body: JSON.stringify(loginRequest)
        });
    }

    signup(signupRequest) {
        return APIUtils.request({
            url: `${API_BASE_URL}/auth/signup`,
            method: 'POST',
            body: JSON.stringify(signupRequest)
        });
    }

    updateUserEvent(eventRequest) {
        this.checkAccessToken();
        const id = eventRequest.userId;
        const eventId = eventRequest.eventId;
        const type = eventRequest.type;

        return APIUtils.request({
            url: `${API_BASE_URL}/user/${id}/?eventId=${eventId}&type=${type}`,
            method: 'PUT'
        });
    }

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new UserAPI()