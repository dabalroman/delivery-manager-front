export default class Api {
    BATCH = 'batch';

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
        console.log(queryURL);

        fetch(queryURL, {method: 'GET'})
            .then(response => response.json())
            .then(
                (result) => onSuccess(result),
                (error) => onError(error)
            );
    }
}