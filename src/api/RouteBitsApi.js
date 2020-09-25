import Api from "./Api";

export default class RouteBitsApi extends Api {
    /**
     * @callback onSuccessGetRouteBits
     * @param {RouteBit} data
     */

    /**
     * @param {string} addressIdPair
     * @param {onSuccessGetRouteBits} onSuccess
     * @param {onError} onError
     */
    static get(addressIdPair, onSuccess, onError) {
        let api = new Api();

        api.get(api.ROUTE_BITS, addressIdPair, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }
}