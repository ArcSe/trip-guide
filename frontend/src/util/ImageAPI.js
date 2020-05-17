import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class ImageAPI {

    getCover(imageRequest) {
        const id = imageRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event/cover?id=${id}`,
            method: 'GET'
        });
    }

    getPhotos(imageRequest) {
        const id = imageRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/event/photos?id=${id}`,
            method: 'GET'
        });
    }
}

export default new ImageAPI()