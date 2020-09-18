import React, {useCallback, useEffect, useRef, useState} from 'react'
import update from 'immutability-helper'
import {Card} from './Card'
import {areArraysEqual} from '../../../../utils/array';
import Style from '../OrdersList.module.css'
import {CHANGE_SOURCE} from "../../MapScreen";

export const List = (props) => {

    /**
     * Get orders array and arrange it by order defined by order's id
     * @param {Order[]} orders
     * @param {number[]} ordersArrangement
     * @return {Order[]}
     */
    const arrangeOrdersByOrdersArrangement = (orders, ordersArrangement) => {
        return ordersArrangement.map(orderID => orders.find(el => el['id'] === orderID))
    }

    const [orders, setOrderCards] = useState(arrangeOrdersByOrdersArrangement(props.orders, props.ordersArrangement));
    const updateOrdersArrangement = props.updateOrdersArrangement;
    const ordersArrangement = useRef(props.ordersArrangement.slice());
    const firstRender = useRef(true);

    /**
     * Watch for external orders arrangement changes
     */
    useEffect(() => {
        if (areArraysEqual(ordersArrangement.current, props.ordersArrangement)) {
            return;
        }

        ordersArrangement.current = props.ordersArrangement;
        setOrderCards(arrangeOrdersByOrdersArrangement(props.orders, props.ordersArrangement));
    }, [props.ordersArrangement, props.orders])

    /**
     * Update external orders arrangement after timeout
     */
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        let arrangement = createArrangementMap(orders);
        const timeout = setTimeout(() => {
            ordersArrangement.current = createArrangementMap(orders);
            updateOrdersArrangement(arrangement);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [orders, updateOrdersArrangement]);


    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = orders[dragIndex];
            setOrderCards(
                update(orders, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            );
        },
        [orders],
    );

    /**
     * Get order ids from orders array in it's current arrangement
     * @param {Order[]} orders
     * @return {number[]}
     */
    const createArrangementMap = (orders) => {
        return orders.map(order => order.id);
    };

    const refs = orders.reduce((acc, value) => {
        acc[value.id] = React.createRef();
        return acc;
    }, {});

    useEffect(() => {
        if (refs[props.activeOrder.id] !== undefined && props.activeOrder.changeSource !== CHANGE_SOURCE.LIST) {
            refs[props.activeOrder.id].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [refs, props.activeOrder.id, props.activeOrder.changeSource]);


    /**
     * @param {Order} order
     * @param {number} index
     * @return {JSX.Element}
     */
    const renderCard = (order, index) => {
        let active = props.activeOrder.id === order.id;

        return (
            <div key={order.id}>
                <div ref={refs[order.id]} className={Style.scrollOffset}/>
                <Card
                    id={order.id}
                    order={order}
                    index={index}
                    active={active}
                    moveCard={moveCard}
                    setActiveOrder={props.setActiveOrder}
                />
            </div>
        )
    };

    return (
        <div>{orders.map((order, i) => renderCard(order, i))}</div>
    )
};
