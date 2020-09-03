import React, {Component} from "react";
import Style from "./OrdersList.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {List} from "./DragAndDrop/List";

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

    updateRoute(newRoute){
        this.route = newRoute.slice();
        console.log(this.route);
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
                    <DndProvider backend={HTML5Backend}>
                        <List ordersData={orders} updateRoute={(newRoute) => this.updateRoute(newRoute)}/>
                    </DndProvider>
                </div>
            );
        }
    }
}

export default OrdersList;