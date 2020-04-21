import { API_BASE_URL, ACCESS_TOKEN } from '../constants';




const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

// Временна заглушка для delete метода
const request2 = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(request);
            }
            return response;
        });
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function deleteCity(cityId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request2({
        url: `${API_BASE_URL}/api/city/${cityId}`,
        method: 'DELETE'
    });
}

export function deleteEvent(eventId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request2({
        url: `${API_BASE_URL}/api/event/${eventId}`,
        method: 'DELETE'
    });
}

export function deleteCategory(categoryId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request2({
        url: `${API_BASE_URL}/api/category/${categoryId}`,
        method: 'DELETE'
    });
}

export function editEvent(eventRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const eventId = eventRequest.id;

    return request({
        url: `${API_BASE_URL}/api/city/${eventId}`,
        method: 'PUT',
        body: JSON.stringify(eventRequest)
    });
}

export function editCity(cityRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const cityId = cityRequest.id;

    return request({
        url: `${API_BASE_URL}/api/city/${cityId}`,
        method: 'PUT',
        body: JSON.stringify(cityRequest)
    });
}

export function editCategory(categoryRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const categoryId = categoryRequest.id;

    return request({
        url: `${API_BASE_URL}/api/category/${categoryId}`,
        method: 'PUT',
        body: JSON.stringify(categoryRequest)
    });
}

export function createCity(cityRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/city",
        method: 'POST',
        body: JSON.stringify(cityRequest)
    });
}

export function createCategory(categoryRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/category",
        method: 'POST',
        body: JSON.stringify(categoryRequest)
    });
}


export function getCities(citiesRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const page = citiesRequest.page;
    const size = citiesRequest.size;

    return request({
        url: `${API_BASE_URL}/api/cities/?page=${page}&size=${size}`,
        method: 'GET'
    });
}

export function getCategories(categoriesRequest) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const page = categoriesRequest.page;
    const size = categoriesRequest.size;

    return request({
        url: `${API_BASE_URL}/api/categories/?page=${page}&size=${size}`,
        method: 'GET'
    });
}

export function getCategoriesByName(categoriesRequest) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const name = categoriesRequest.name;

    console.log(`${API_BASE_URL}/api/category/?name=${name}`);
    return request({
        url: `${API_BASE_URL}/api/category/?name=${name}`,
        method: 'GET'
    });
}


export function getAllEvents(eventsRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const page = eventsRequest.page;
    const size = eventsRequest.size;

    return request({
        url: `${API_BASE_URL}/api/events/?page=${page}&size=${size}`,
    });
}

export function getCitiesByName(citiesRequest) {
    const name = citiesRequest.name;

    console.log(`${API_BASE_URL}/api/city/?name=${name}`);
    return request({
        url: `${API_BASE_URL}/api/city/?name=${name}`,
        method: 'GET'
    });
}

export function getEvents(eventsRequest) {

    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const pageable = eventsRequest.pageable;
    const filters = eventsRequest.filters;

    const pageableParams = Object.keys(pageable).map(key =>
        key + '=' + (pageable[key] ? pageable[key] : "")).join('&');
    const filtersParams = Object.keys(filters).map(key =>
        key + '=' + (filters[key] ? filters[key] : "")).join('&');

    console.log("Запрос: " + `${API_BASE_URL}/api/event/?${pageableParams}&${filtersParams}`);

    return request({
        url: `${API_BASE_URL}/api/event/?${pageableParams}&${filtersParams}`,
        method: 'GET'
    });
}
