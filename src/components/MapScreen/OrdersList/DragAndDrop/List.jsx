import React, {useCallback, useEffect, useState} from 'react'
import {Card} from './Card'
import update from 'immutability-helper'

export const List = (props) => {
    const [cards, setCards] = useState(props.ordersData);
    const updateRoute = props.updateRoute;

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateRoute(createRouteArray(cards));
        }, 5000);

        return () => clearTimeout(timeout);
    },[cards, updateRoute]);

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            );
        },
        [cards],
    );

    const renderCard = (card, index) => {
        return (
            <Card
                key={card['id']}
                index={index}
                id={card['id']}
                data={{
                    type: card['type'],
                    amount: card['amount'],
                    address_id: card['address_id'],
                    city: card['city'],
                    street: card['street'],
                    street_number: card['street_number'],
                    flat_number: card['flat_number']
                }}
                moveCard={moveCard}
                setActiveOrder={props.setActiveOrder}
            />
        )
    };

    const createRouteArray = (cards) => {
        return cards.map(card => card.address_id);
    };

    return (
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
    )
};
