import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Style from "../OrdersList.module.css";

export const Card = ({ id, data, index, moveCard }) => {
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

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div ref={ref} className={Style.card} key={data.id} data-aid={data.address_id} style={{ opacity }}>
            <span className={Style.address}>{data.street} {data.street_number} {(data.flat_number) ? '/ ' + data.flat_number : null}</span>
            <span className={Style.details}>{data.amount}x {data.type} ({data.address_id})</span>
        </div>
    )
};
