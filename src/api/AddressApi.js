import Api from "./Api";

export default class AddressApi extends Api {
    /**
     * @callback onSuccessAddress
     * @param {Address} data
     */

    /**
     * @param {number} addressId
     * @param {onSuccessAddress} onSuccess
     * @param {onError} onError
     */
    static get(addressId, onSuccess, onError) {
        let api = new Api();

        api.get(api.ADDRESS, addressId, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }

    /**
     * @param {number} addressId
     * @param {Address|Object} data
     * @param {onSuccessAddress} onSuccess
     * @param {onError} onError
     */
    static put(addressId, data, onSuccess, onError) {
        let api = new Api();

        api.put(api.ADDRESS, addressId, data, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }
}