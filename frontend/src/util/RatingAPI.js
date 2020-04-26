import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class RatingAPI {

    updateRating(ratingRequest) {
        this.checkAccessToken();

        console.log(ratingRequest);
        console.log(`${API_BASE_URL}/api/rating`);
        return APIUtils.request({
            url: `${API_BASE_URL}/api/rating`,
            method: 'PUT',
            body: JSON.stringify(ratingRequest)
        });
    }

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new RatingAPI()