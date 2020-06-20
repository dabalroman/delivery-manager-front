import React, {useCallback, useState} from 'react'
import {Card} from './Card'
import update from 'immutability-helper'

export const List = (ordersData) => {
    const [cards, setCards] = useState(...Object.values(ordersData));

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
            )
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
            />
        )
    };

    return (
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
    )
};
