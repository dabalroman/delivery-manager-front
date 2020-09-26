import Api from "./Api";

export default class RouteBitsApi extends Api {
    /**
     * @callback onSuccessGetRouteBits
     * @param {RouteBit[]} data
     */

    /**
     * @param {string} addressIdPairs
     * @param {onSuccessGetRouteBits} onSuccess
     * @param {onError} onError
     */
    static get(addressIdPairs, onSuccess, onError) {
        let api = new Api();

        api.get(api.ROUTE_BITS, addressIdPairs, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }
}