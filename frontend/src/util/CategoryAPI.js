import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import APIUtils from "./APIUtils";

class CategoryAPI {

    createCategory(categoryRequest) {
        this.checkAccessToken();

        return APIUtils.request({
            url: `${API_BASE_URL}/api/category`,
            method: 'POST',
            body: JSON.stringify(categoryRequest)
        });
    }

    getCategories(categoriesRequest) {
        const page = categoriesRequest.page;
        const size = categoriesRequest.size;
        const name = categoriesRequest.name ? categoriesRequest.name : "";

        return APIUtils.request({
            url: `${API_BASE_URL}/api/categories/?page=${page}&size=${size}&name=${name}`,
            method: 'GET'
        });
    }

    editCategory(categoryRequest) {
        this.checkAccessToken();
        const categoryId = categoryRequest.id;

        return APIUtils.request({
            url: `${API_BASE_URL}/api/category/${categoryId}`,
            method: 'PUT',
            body: JSON.stringify(categoryRequest)
        });
    }

    deleteCategory(categoryId) {
        this.checkAccessToken();

        return APIUtils.request2({
            url: `${API_BASE_URL}/api/category/${categoryId}`,
            method: 'DELETE'
        });
    }

    checkAccessToken() {
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("Отсутствует access token.");
        }
    }
}

export default new CategoryAPI()