/* eslint-disable no-unused-vars */

export default class Route {
    /** @var {string  addresses_ids */
    addresses_ids;
    /** @var {number} batch_id */
    batch_id;
    /** @var {number} courier_id */
    courier_id;
    /** @var {number} id */
    id;
    /** @var {string} id_hash */
    id_hash;
    /** @var {string} routed_hash */
    routed_hash;

    /**
     *
     * @param {int[]} route Route composed from addresses IDs
     * @param {Order[]} orders Orders array
     * @return {int[]} Arrangement composed from orders IDs
     */
    static transformRouteToOrdersArrangement(route, orders){
        return route.map(addressId => orders.find(order => order.address_id === addressId).id);
    }

    /**
     *
     * @param {int[]} arrangement Arrangement composed from orders IDs
     * @param {Order[]} orders Orders array
     * @return {int[]} Route composed from addresses IDs
     */
    static transformOrdersArrangementToRoute(arrangement, orders){
        return arrangement.map(orderId => orders.find(order => order.id === orderId).address_id);
    }
}