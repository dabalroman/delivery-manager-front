import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {OrdersList} from "./OrdersList/OrdersList";
import {AddressDetails} from "./AddressDetails/AddressDetails";
import Batch from "../../api/Batch";

import Style from "./MapScreen.module.css"
import Map from "./Map/Map";

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            orderAddressMap: [],
            ordersAmount: null,
            activeOrderID: null,
            activeOrderTabPos: 0,
            hoverOrderID: null,
            hoverOrderTabID: 0,
            batchID: null,
            newAddressesAmount: null,
            knownAddressesAmount: null,
            deliveryDate: null,
        };

        this.route = [];
        this.setActiveOrder = this.setActiveOrder.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
    }

    updateRoute(newRoute) {
        this.route = newRoute.slice();
        console.log(this.route.join(','));
    }

    setActiveOrder(orderID) {
        let orderTabPos = this.state.orders.findIndex(el => el['id'] === orderID);
        this.setState({
            activeOrderID: orderID,
            activeOrderTabPos: orderTabPos
        })
    }

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
        Batch.get(1, (data) => {
            console.log(data);

            this.route = data.routes[0].addresses_ids.split(',').map(x => parseInt(x));
            console.log(this.route);

            this.setState({
                isLoaded: true,
                batchID: data.batch_id,
                deliveryDate: data.delivery_date,
                ordersAmount: data.orders_amount,
                newAddressesAmount: data.new_addresses_amount,
                knownAddressesAmount: data.known_addresses_amount,
                orders: data.orders,
                orderAddressMap: this.buildOrderAddressMap(data.orders, this.route).slice()
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
                                ordersAmount={this.state.ordersAmount}
                                deliveryDate={this.state.deliveryDate}
                                batchID={this.state.batchID}
                                setActiveOrder={this.setActiveOrder}
                                updateRoute={this.updateRoute}
                            />
                        </Col>
                        <Col xs={2}>
                            <AddressDetails
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