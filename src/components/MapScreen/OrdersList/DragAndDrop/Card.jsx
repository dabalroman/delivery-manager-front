import React, {useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes'
import {CHANGE_SOURCE} from "../../MapScreen";

import Style from "../OrdersList.module.css";

/**
 * @param {number} id
 * @param {Order} order
 * @param {number} index
 * @param {boolean} active
 * @param {function} moveCard
 * @param {function} setActiveOrder
 * @constructor
 */
export const Card = ({id, order, index, active, moveCard, setActiveOrder}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            // noinspection JSUnresolvedFunction
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex
        },
    });

    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.1 : 1;
    const bgc = isDragging ? "#55F" : '';
    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`${Style.card} ${active ? Style.active : ''}`}
            data-aid={order.address_id}
            style={{backgroundColor: bgc, opacity}}
            onClick={() => {
                setActiveOrder(id, CHANGE_SOURCE.LIST)
            }}
        >
            <div className={Style.left}>{index+1}</div>
            <div className={Style.right}>
                <span className={Style.address}>
                    {order.street} {order.street_number} {(order.flat_number) ? '/ ' + order.flat_number : null}
                </span>
                <span className={Style.details}>
                    {order.amount}x {order.type} (#{(order.address_id).toString().padStart(3, '0')})
                </span>
            </div>
        </div>
    )
};
