import React, {Component} from "react";
import Style from "./OrdersList.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {List} from "./DragAndDrop/List";

class OrdersList extends Component {
    updateRoute(newRoute) {
        this.route = newRoute.slice();
        console.log(this.route);
    }

    render() {
        return (
            <div className={Style.list}>
                <div className={Style.head}>
                    <span>Adresy / Paczki</span>
                    <span className={Style.amount}>{this.props.orders.length} / {this.props.ordersAmount}</span>
                    <span className={Style.date}>{this.props.deliveryDate}</span>
                    <span>#{(this.props.batchID).toString().padStart(3, '0')}</span>
                </div>
                <DndProvider backend={HTML5Backend}>
                    <List
                        ordersData={this.props.orders}
                        updateRoute={(newRoute) => this.updateRoute(newRoute)}
                        setActiveOrder={this.props.setActiveOrder}
                    />
                </DndProvider>
            </div>
        );
    }
}

export default OrdersList;