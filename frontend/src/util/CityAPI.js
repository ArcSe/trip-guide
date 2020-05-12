import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class CityAPI  {

    createCity(cityRequest) {
        this.checkAccessToken();

        return APIUtils.request({
            url: `${API_BASE_URL}/api/city`,
            method: 'POST',
            body: JSON.stringify(cityRequest)
        });
    }

    getCities(citiesRequest) {
        const page = citiesRequest.page;
        const size = citiesRequest.size;
        const name = citiesRequest.name ? citiesRequest.name : "";

        return APIUtils.request({
            url: `${API_BASE_URL}/api/cities/?page=${page}&size=${size}&name=${name}`,
            method: 'GET'
        });
    }

    editCity(cityRequest) {
        this.checkAccessToken();
        const cityId = cityRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/city/${cityId}`,
            method: 'PUT',
            body: JSON.stringify(cityRequest)
        });
    }

    deleteCity(cityId) {
        this.checkAccessToken();

        return APIUtils.request2({
            url: `${API_BASE_URL}/api/city/${cityId}`,
            method: 'DELETE'
        });
    }

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new CityAPI()