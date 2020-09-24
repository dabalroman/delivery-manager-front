import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

import {OrdersList} from "./OrdersList/OrdersList";
import OrderDetails from "./OrderDetails/OrderDetails";
import Map from "./Map/Map";
import BatchApi from "../../api/BatchApi";
import RouteApi from "../../api/RouteApi";

import Style from "./MapScreen.module.css"
import {NavigationBar} from "./NavigationBar/NavigationBar";
import Route from "../../data_models/Route";

export const CHANGE_SOURCE = {
    DEFAULT: 0,
    MAP: 1,
    LIST: 2
};

class MapScreen extends Component {
    constructor(props) {
        super(props);

        /**
         * @namespace state
         * @property {Order[]} orders Order object
         * @property {int[]} ordersArrangement Array with order ids arranged accordingly to address order in route
         * @property {int} ordersAmount
         * @property {?int} batchId Id of currently loaded batch
         * @property {?int} routeId Id of currently loaded route
         * @property {int} newAddressesAmount
         * @property {int} knownAddressesAmount
         * @property {string} deliveryDate
         */
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            ordersArrangement: [],
            ordersAmount: 0,
            activeOrder: {
                id: 0,
                tabPos: 0,
                changeSource: null
            },
            batchId: null,
            routeId: null,
            newAddressesAmount: 0,
            knownAddressesAmount: 0,
            deliveryDate: '',
        };

        this.setActiveBatch = this.setActiveBatch.bind(this);
        this.setActiveOrder = this.setActiveOrder.bind(this);
        this.updateOrdersArrangement = this.updateOrdersArrangement.bind(this);
    }

    /**
     * Update order arrangement locally and push to db
     * @param {int[]} newArrangement Int array containing Orders IDs
     */
    updateOrdersArrangement(newArrangement) {
        //TODO: FIX - double execution on startup

        this.setState({
            ordersArrangement: newArrangement.slice()
        });

        RouteApi.put(
            this.state.routeId,
            {
                addresses_ids: Route.transformOrdersArrangementToRoute(newArrangement, this.state.orders).join(',')
            },
            () => {
                console.log("OK")
            },
            () => console.log("ERROR")
        );

        console.log("ORDERS ARRANGEMENT UPDATED");
    }

    /**
     * Set active order to display in details window
     * @param {number} orderID
     * @param {int} source
     */
    setActiveOrder(orderID, source) {
        let orderTabPos = this.state.orders.findIndex(el => el['id'] === orderID);
        this.setState({
            activeOrder: {
                id: orderID,
                tabPos: orderTabPos,
                changeSource: source
            },
        });
    }

    /**
     * Return active order
     * @return {Order}
     */
    getActiveOrder() {
        return this.state.orders[this.state.activeOrder.tabPos];
    }

    /**
     * Select active batch on startup
     */
    componentDidMount() {
        this.setActiveBatch(1);
    }

    /**
     * Load all batch data including orders details and related routes
     * @param {number} batchId BatchId to load from db
     */
    setActiveBatch(batchId){
        BatchApi.get(batchId, (data) => {
            console.log(data);

            let route = data.route.addresses_ids.split(',').map(x => parseInt(x));
            let arrangement = Route.transformRouteToOrdersArrangement(route, data.orders);

            this.setState({
                isLoaded: true,
                orders: data.orders.slice(),
                ordersArrangement: arrangement,
                ordersAmount: data.orders_amount,
                activeOrder: {
                    id: data.orders[0].id,
                    tabPos: 0,
                    changeSource: CHANGE_SOURCE.DEFAULT
                },
                batchId: data.batch_id,
                routeId: data.route.id,
                newAddressesAmount: data.new_addresses_amount,
                knownAddressesAmount: data.known_addresses_amount,
                deliveryDate: data.delivery_date
            });

        }, (error) => {
            this.setState({
                isLoaded: true,
                error: {message: error}
            });
        });
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container className={Style.height100}>
                    <Row className={Style.navBar} noGutters>
                        <Col>
                            <NavigationBar
                                activeBatch={this.state.batchId}
                                setActiveBatch={this.setActiveBatch}
                            />
                        </Col>
                    </Row>
                    <Row className={Style.screen} noGutters>
                        <Col xs={8} className={Style.height100}>
                            <Map
                                orders={this.state.orders}
                                arrangement={this.state.ordersArrangement}
                                activeOrder={this.state.activeOrder}
                                setActiveOrder={this.setActiveOrder}
                            />
                        </Col>
                        <Col xs={2} className={Style.height100}>
                            <OrdersList
                                orders={this.state.orders}
                                activeOrder={this.state.activeOrder}
                                ordersArrangement={this.state.ordersArrangement}
                                ordersAmount={this.state.ordersAmount}
                                deliveryDate={this.state.deliveryDate}
                                batchId={this.state.batchId}
                                setActiveOrder={this.setActiveOrder}
                                updateOrdersArrangement={this.updateOrdersArrangement}
                            />
                        </Col>
                        <Col xs={2}>
                            <OrderDetails
                                order={this.getActiveOrder()}
                                orderUpdated={() => this.forceUpdate()}
                            />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default MapScreen;