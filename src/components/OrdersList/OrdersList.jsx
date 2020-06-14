import React, {Component} from "react";
import Style from "./OrdersList.module.css";

class OrdersList extends Component{
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
                        ordersAmount: result.data.orders_amount,
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
                <div className={Style.list}>
                    <div className={Style.head}>
                        <span className={Style.amount}>{orders.length} / {batchData['ordersAmount']}</span>
                        <span className={Style.date}>{batchData['deliveryDate']}</span>
                    </div>
                    {orders.map(order => (
                        <div className={Style.card} key={order.id}>
                            <span className={Style.address}>{order.street} {order.street_number} {(order.flat_number) ? '/ ' + order.flat_number : null}</span>
                            <span className={Style.details}>{order.amount}x {order.type}</span>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default OrdersList;