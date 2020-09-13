export default class Api {
    BATCH = 'batch';
    ROUTE = 'route';

    /**
     * @callback onSuccess
     * @param {Response} result
     */

    /**
     * @callback onError
     * @param {any} error
     */

    /**
     * @param {string} endpoint
     * @param {number} resourceId
     * @param {onSuccess} onSuccess
     * @param {onError} onError
     */
    get(endpoint, resourceId, onSuccess, onError) {
        let queryURL = `${process.env.REACT_APP_API_URL}/${endpoint}/${resourceId}`;

        fetch(queryURL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(
                (result) => onSuccess(result),
                (error) => onError(error)
            );
    }

    /**
     * @param {string} endpoint
     * @param {number} resourceId
     * @param {array} data
     * @param {onSuccess} onSuccess
     * @param {onError} onError
     */
    put(endpoint, resourceId, data, onSuccess, onError) {
        let queryURL = `${process.env.REACT_APP_API_URL}/${endpoint}/${resourceId}`;

        fetch(queryURL, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(
                (result) => onSuccess(result),
                (error) => onError(error)
            );
    }

    /**
     * @param {string} endpoint
     * @param {array} data
     * @param {onSuccess} onSuccess
     * @param {onError} onError
     */
    post(endpoint, data, onSuccess, onError) {
        let queryURL = `${process.env.REACT_APP_API_URL}/${endpoint}`;

        fetch(queryURL, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(
                (result) => onSuccess(result),
                (error) => onError(error)
            );
    }

    /**
     * @param {string} endpoint
     * @param {number} resourceId
     * @param {onSuccess} onSuccess
     * @param {onError} onError
     */
    delete(endpoint, resourceId, onSuccess, onError) {
        let queryURL = `${process.env.REACT_APP_API_URL}/${endpoint}/${resourceId}`;

        fetch(queryURL, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(
                (result) => onSuccess(result),
                (error) => onError(error)
            );
    }
}