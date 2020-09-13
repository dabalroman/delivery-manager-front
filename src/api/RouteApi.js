import Api from "./Api";

export default class RouteApi extends Api{
    /**
     * @callback onSuccessPutRoute
     * @param {Route} data
     */

    /**
     *
     * @param {number} routeId
     * @param {Route|Object} routeData
     * @param {onSuccessPutRoute} onSuccess
     * @param {onError} onError
     */
    static put(routeId, routeData, onSuccess, onError) {
        let api = new Api();

        // noinspection JSCheckFunctionSignatures
        api.put(api.ROUTE, routeId, routeData, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }
}