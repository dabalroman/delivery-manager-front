import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {OrdersList} from "./OrdersList/OrdersList";
import {OrderDetails} from "./OrderDetails/OrderDetails";
import Map from "./Map/Map";
import BatchApi from "../../api/BatchApi";
import RouteApi from "../../api/RouteApi";
import Style from "./MapScreen.module.css"

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            ordersArrangement: [],
            orderAddressMap: [],
            ordersAmount: null,
            activeOrderID: null,
            activeOrderTabPos: 0,
            hoverOrderID: null,
            hoverOrderTabID: 0,
            batchId: null,
            routeId: null,
            newAddressesAmount: null,
            knownAddressesAmount: null,
            deliveryDate: null,
        };

        this.setActiveOrder = this.setActiveOrder.bind(this);
        this.updateOrdersArrangement = this.updateOrdersArrangement.bind(this);
    }

    /**
     * Update order arrangement
     * @param newArrangement
     */
    updateOrdersArrangement(newArrangement) {
        //TODO: FIX - double execution on startup

        this.setState({
            ordersArrangement: newArrangement.slice()
        });

        RouteApi.put(
            this.state.routeId,
            {addresses_ids: newArrangement.join(',')},
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
     */
    setActiveOrder(orderID) {
        let orderTabPos = this.state.orders.findIndex(el => el['id'] === orderID);
        this.setState({
            activeOrderID: orderID,
            activeOrderTabPos: orderTabPos
        })
    }

    /**
     * Return active order
     * @return {Order}
     */
    getActiveOrder() {
        return this.state.orders[this.state.activeOrderTabPos];
    }

    /**
     * @param {Order[]} ordersArray
     * @param {number[]|null} route
     */
    buildOrderAddressMap(ordersArray, route = null) {
        let tempMap = [];

        for (let i = 0; i < ordersArray.length; i++) {
            tempMap.push({
                order_id: ordersArray[i].id,
                route_position: (route) ? route.indexOf(ordersArray[i].id) : i,
                address_id: ordersArray[i].address_id,
                coordinates: ordersArray[i].geo_cord
            });
        }

        return tempMap;
    }

    componentDidMount() {
        BatchApi.get(1, (data) => {
            console.log(data);

            let route = data.routes[0].addresses_ids.split(',').map(x => parseInt(x));
            console.log(route);

            this.setState({
                isLoaded: true,
                batchId: data.batch_id,
                deliveryDate: data.delivery_date,
                ordersAmount: data.orders_amount,
                newAddressesAmount: data.new_addresses_amount,
                knownAddressesAmount: data.known_addresses_amount,
                orders: data.orders,
                ordersArrangement: route,
                orderAddressMap: this.buildOrderAddressMap(data.orders, route).slice(),
                routeId: data.routes[0].id
            });

            this.setActiveOrder(data.orders[0].id);
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
                    <Row className={Style.height100} noGutters>
                        <Col xs={8} className={Style.height100}>
                            <Map
                                orderAddressMap={this.state.orderAddressMap}
                            />
                        </Col>
                        <Col xs={2} className={Style.height100}>
                            <OrdersList
                                orders={this.state.orders}
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
                            />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default MapScreen;