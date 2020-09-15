/* eslint-disable jsx-a11y/accessible-emoji */
import React, {Component} from "react";
import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import Style from "./OrderDetails.module.css";
import AddressApi from "../../../api/AddressApi";

class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            editedOrder: null
        }

        this.setEditMode.bind(this);
        this.currentOrder = {'id': this.props.order.address_id};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.state.editMode || !nextState.editMode;
    }

    setEditMode(newEditMode) {
        if (this.state.editMode && !newEditMode) {
            this.setState({
                editMode: false
            });

            delete this.currentOrder.id;

            //Update address in db and force rerender
            if (Object.keys(this.currentOrder).length !== 0) {
                AddressApi.put(this.props.order.address_id, this.currentOrder, () => {
                    Object.assign(this.props.order, this.currentOrder);
                    this.props.orderUpdated();
                }, () => {

                });
            }
        } else {
            this.currentOrder = {'id': this.props.order.address_id};

            this.setState({
                editMode: true
            });
        }
    }

    editValue(field, value) {
        this.currentOrder[field] = value;
    }

    renderDefault() {
        return (
            <div className={Style.module}>
                <div className={Style.address}>
                    <span>{this.props.order.street} {this.props.order.street_number} {(this.props.order.flat_number) ? '/ ' + this.props.order.flat_number : null}</span>
                    <br/>
                    <span className={Style.city}>{this.props.order.city}</span>
                </div>

                <Table className={Style.table}>
                    <tbody>
                    <tr>
                        <td className={Style.cellLeft}>📦 Box</td>
                        <td className={Style.cellRight}>{this.props.order.type} - {this.props.order.amount} szt.</td>
                    </tr>
                    <tr>
                        <td className={Style.cellLeft}>🔑 Kod domofonu</td>
                        <td className={Style.cellRight}>{this.props.order.code || '-'}</td>
                    </tr>
                    <tr>
                        <td className={Style.cellLeft}>🔼 Piętro</td>
                        <td className={Style.cellRight}>{this.props.order.floor || '-'}</td>
                    </tr>
                    <tr>
                        <td className={Style.cellLeft}>📞 Telefon</td>
                        <td className={Style.cellRight}>{this.props.order.phone}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <span className='d-block mb-1'>💬 Komentarz</span>
                            <i>{this.props.order.comment || '-'}</i>
                        </td>
                    </tr>
                    <tr>
                        <td className={Style.cellLeft}>🆔 ID Zamówienia</td>
                        <td className={Style.cellRight}>#{this.props.order.id.toString().padStart(3, '0')}</td>
                    </tr>
                    <tr>
                        <td className={Style.cellLeft}>🆔 ID Adresu</td>
                        <td className={Style.cellRight}>#{this.props.order.address_id.toString().padStart(3, '0')}</td>
                    </tr>
                    </tbody>
                </Table>

                <div className={Style.buttonContainer}>
                    <Button onClick={() => this.setEditMode(true)} variant='outline-secondary'>Edytuj</Button>
                </div>
            </div>
        );
    }

    renderEdit() {
        return (
            <div className={Style.module}>
                <div className={Style.address}>
                    <span>Edytowanie adresu</span>
                </div>

                <InputGroup>
                    <Table className={Style.table}>
                        <tbody>
                        <tr>
                            <td className={Style.cellLeft}>🏙 Miasto</td>
                            <td className={Style.cellRight}>
                                <FormControl
                                    defaultValue={this.props.order.city || ''}
                                    onChange={(x) => this.editValue('city', x.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={Style.cellLeft}>🚗 Ulica</td>
                            <td className={Style.cellRight}>
                                <FormControl
                                    defaultValue={this.props.order.street || ''}
                                    onChange={(x) => this.editValue('street', x.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={Style.cellLeft}>🏠 Numer domu</td>
                            <td className={Style.cellRight}>
                                <FormControl
                                    defaultValue={this.props.order.street_number || ''}
                                    onChange={(x) => this.editValue('street_number', x.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={Style.cellLeft}>🚪 Mieszkanie</td>
                            <td className={Style.cellRight}><FormControl
                                defaultValue={this.props.order.flat_number || ''}
                                onChange={(x) => this.editValue('flat_number', x.target.value)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className={Style.cellLeft}>🔑 Kod domofonu</td>
                            <td className={Style.cellRight}><FormControl
                                defaultValue={this.props.order.code || ''}
                                onChange={(x) => this.editValue('code', x.target.value)}
                            /></td>
                        </tr>
                        <tr>
                            <td className={Style.cellLeft}>🔼 Piętro</td>
                            <td className={Style.cellRight}><FormControl
                                defaultValue={this.props.order.floor || ''}
                                onChange={(x) => this.editValue('floor', x.target.value)}
                            /></td>
                        </tr>
                        <tr>
                            <td className={Style.cellLeft}>📞 Telefon</td>
                            <td className={Style.cellRight}><FormControl
                                defaultValue={this.props.order.phone || ''}
                                onChange={(x) => this.editValue('phone', x.target.value)}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <span className='d-block mb-2'>💬 Komentarz</span>
                                <FormControl
                                    as="textarea"
                                    defaultValue={this.props.order.comment || ''}
                                    onChange={(x) => this.editValue('comment', x.target.value)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </InputGroup>

                <div className={Style.buttonContainer}>
                    <Button onClick={() => this.setEditMode(false)} variant='outline-primary'>Zapisz</Button>
                </div>
            </div>
        );
    }

    render() {
        return (this.state.editMode) ? this.renderEdit() : this.renderDefault();
    }
}

export default OrderDetails;