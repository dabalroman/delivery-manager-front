import Api from "./Api";

export default class Batch extends Api{
    /**
     * @callback onSuccessBatch
     * @param {BatchData} data
     */

    /**
     * @param {number} batchId
     * @param {onSuccessBatch} onSuccess
     * @param {onError} onError
     */
    static get(batchId, onSuccess, onError){
        let api = new Api();

        api.get(api.BATCH, batchId, (result) => {
            onSuccess(result['data']);
        }, (error) => {
            onError(error);
        });
    }
}