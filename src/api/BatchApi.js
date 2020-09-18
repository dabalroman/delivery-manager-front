import Api from "./Api";

export default class BatchApi extends Api {
    /**
     * @callback onSuccessBatch
     * @param {BatchData} data
     */

    /**
     * @param {number} batchId
     * @param {onSuccessBatch} onSuccess
     * @param {onError} onError
     */
    static get(batchId, onSuccess, onError) {
        let api = new Api();

        api.get(api.BATCH, batchId, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }

    /**
     * @param {int} userId
     * @param {onSuccessBatch} onSuccess
     * @param {onError} onError
     */
    static getList(userId, onSuccess, onError) {
        let api = new Api();

        api.get(api.BATCH_LIST, userId, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }
}