/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import PrintTemplate from "react-print";
import Style from './PrintOrderListTemplate.module.css';

export default class PrintOrderListTemplate extends React.Component {
    render() {
        const ordersTableGuts = this.props.ordersArrangement
            .map(orderId => this.props.orders.find(el => el['id'] === orderId))
            .map((orderData, index) => {
                return (
                    <tr key={index}>
                        <td className={Style.id}>{index}</td>
                        <td className={Style.diet}>
                            <span
                                className={(orderData.amount > 1) ? Style.highAmount : ''}>{orderData.amount}x</span> {orderData.type}
                        </td>
                        <td className={Style.address}>
                            {orderData.street} {orderData.street_number}
                            {(orderData.flat_number) ? ' / ' + orderData.flat_number : ''}
                            <span className={Style.floor}>{(orderData.floor) ? ' p. ' + orderData.floor : ''}</span>
                        </td>
                        <td className={Style.code}>{orderData.code}</td>
                        <td className={Style.phone}>{orderData.phone}</td>
                    </tr>
                );
            });

        return (
            <PrintTemplate>
                <div className={Style.container}>
                    <div className={Style.branding}>
                        Delivery Manager <span>v0.1</span>
                    </div>

                    <table className={Style.info}>
                        <tbody>
                        <tr>
                            <td>Kurs z dnia {this.props.deliveryDate}</td>
                            <td>Ilość zamówień: {this.props.orders.length}</td>
                            <td>Ilość paczek: {this.props.ordersAmount}</td>
                        </tr>
                        </tbody>
                    </table>

                    <table className={Style.table}>
                        <thead>
                        <tr>
                            <th className={Style.id}>#</th>
                            <th className={Style.diet}>📦 Dieta</th>
                            <th className={Style.address}>🏠 Adres</th>
                            <th className={Style.code}>🔑 Kod</th>
                            <th className={Style.phone}>📞 Telefon</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ordersTableGuts}
                        </tbody>
                    </table>
                </div>
            </PrintTemplate>
        )
    }
}