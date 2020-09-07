/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Table from 'react-bootstrap/Table';
import Style from "./AddressDetails.module.css";

export const AddressDetails = ({order}) => (
        <div className={Style.module}>
            <div className={Style.address}>
                <span>{order['street']} {order['street_number']} {(order['flat_number']) ? '/ ' + order['flat_number'] : null}</span>
                <br/>
                <span className={Style.city}>{order['city']}</span>
            </div>

            <Table  className={Style.table}>
                <tbody>
                <tr>
                    <td className={Style.cellLeft}>📦 Box</td>
                    <td className={Style.cellRight}>{order['type']} - {order['amount']} szt.</td>
                </tr>
                <tr>
                    <td className={Style.cellLeft}>🔑 Kod domofonu</td>
                    <td className={Style.cellRight}>{order['code']}</td>
                </tr>
                <tr>
                    <td className={Style.cellLeft}>🔼 Piętro</td>
                    <td className={Style.cellRight}>-</td>
                </tr>
                <tr>
                    <td colSpan={2}>💬 Komentarz klienta <br/> <i>{order['comment']}</i></td>
                </tr>
                <tr>
                    <td className={Style.cellLeft}>🆔 ID Zamówienia</td>
                    <td className={Style.cellRight}>#{order['id'].toString().padStart(3, '0')}</td>
                </tr>
                <tr>
                    <td className={Style.cellLeft}>🆔 ID Adresu</td>
                    <td className={Style.cellRight}>#{order['address_id'].toString().padStart(3, '0')}</td>
                </tr>
                </tbody>
            </Table>
        </div>
);