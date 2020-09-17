import React from "react";
import Style from "./OrdersList.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {List} from "./DragAndDrop/List";

export const OrdersList = (props) => (
    <div className={Style.list}>
        <div className={Style.head}>
            <span>Adresy / Paczki</span>
            <span className={Style.amount}>{props.orders.length} / {props.ordersAmount}</span>
            <span className={Style.date}>{props.deliveryDate}</span>
            <span>#{(props.batchId).toString().padStart(3, '0')}</span>
        </div>
        <DndProvider backend={HTML5Backend}>
            <List
                orders={props.orders}
                activeOrder={props.activeOrder}
                ordersArrangement={props.ordersArrangement}
                updateOrdersArrangement={props.updateOrdersArrangement}
                setActiveOrder={props.setActiveOrder}
            />
        </DndProvider>
    </div>
);