/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Table from 'react-bootstrap/Table';
import Style from "./AddressDetails.module.css";

export const AddressDetails = ({order}) => (
        <div>
            <div className={Style.address}>
                <span>{order['street']} {order['street_number']} {(order['flat_number']) ? '/ ' + order['flat_number'] : null}</span>
                <br/>
                <span className={Style.city}>{order['city']}</span>
            </div>

            <Table striped hover className={Style.table}>
                <tbody>
                <tr>
                    <td>📦 Box</td>
                    <td>{order['type']} - {order['amount']} szt.</td>
                </tr>
                <tr>
                    <td>🔑 Kod domofonu</td>
                    <td>{order['code']}</td>
                </tr>
                <tr>
                    <td>🔼 Piętro</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td colSpan={2}>💬 Komentarz klienta <br/> <i>{order['comment']}</i></td>
                </tr>
                <tr>
                    <td>🆔 ID Zamówienia</td>
                    <td>#{order['id'].toString().padStart(3, '0')}</td>
                </tr>
                <tr>
                    <td>🆔 ID Adresu</td>
                    <td>#{order['address_id'].toString().padStart(3, '0')}</td>
                </tr>
                </tbody>
            </Table>
        </div>
);