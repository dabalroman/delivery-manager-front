/* eslint-disable no-unused-vars */

class BatchData {
    /** @var {number} batch_id */
    batch_id;
    /** @var {string} delivery_date */
    delivery_date;
    /** @var {number} orders_amount */
    orders_amount;
    /** @var {number} new_addresses_amount */
    new_addresses_amount;
    /** @var {number} known_addresses_amount */
    known_addresses_amount;
    /** @var {Order[]} orders */
    orders;
    /** @var {Route} routes */
    route;
}