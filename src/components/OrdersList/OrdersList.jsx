import React, {Component} from "react";

class OrdersList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            batchID: null,
            newAddressesAmount: null,
            knownAddressesAmount: null,
            deliveryDate: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/batch/1", {method: 'GET'})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        batchID: result.data.batch_id,
                        deliveryDate: result.data.delivery_date,
                        newAddressesAmount: result.data.new_addresses_amount,
                        knownAddressesAmount: result.data.known_addresses_amount,
                        orders: result.data.orders,
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
        const { error, isLoaded, orders, ...batchData} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            x{order.amount} {order.city}, {order.street} {order.street_number} / {order.flat_number}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default OrdersList;