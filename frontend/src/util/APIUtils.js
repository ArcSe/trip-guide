import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

class APIUtils {

    request(options) {
        const headers = new Headers({'Content-Type': 'application/json',});

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
    }

    // Временная функция для remove методова. ИСПРАВИТЬ!
    request2(options) {
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
}

export default new APIUtils()
