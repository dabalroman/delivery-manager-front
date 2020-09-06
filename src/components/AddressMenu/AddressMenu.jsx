import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import OrdersList from "../OrdersList/OrdersList";

class AddressMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            ordersAmount: null,
            batchID: null,
            newAddressesAmount: null,
            knownAddressesAmount: null,
            deliveryDate: null,
        };

        this.route = [];
    }

    componentDidMount() {
        fetch("http://localhost:8000/batch/1", {method: 'GET'})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        batchID: result.data['batch_id'],
                        deliveryDate: result.data['delivery_date'],
                        ordersAmount: result.data['orders_amount'],
                        newAddressesAmount: result.data['new_addresses_amount'],
                        knownAddressesAmount: result.data['known_addresses_amount'],
                        orders: result.data['orders'],
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <OrdersList
                                orders={this.state.orders}
                                ordersAmount={this.state.ordersAmount}
                                deliveryDate={this.state.deliveryDate}
                                batchID={this.state.batchID}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default AddressMenu;