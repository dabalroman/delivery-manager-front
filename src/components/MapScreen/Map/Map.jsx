import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker, Polyline} from '@react-google-maps/api';
import polylineTools from '@mapbox/polyline';
import {Button} from "react-bootstrap";
import Style from "./Map.module.css"

import {API_KEY} from "./api_key";
import {mapStyle} from "./MapStyle";
import {CHANGE_SOURCE} from "../MapScreen";

import markerRedIcon from './../../../assets/icons/spotlight-poi-dotless-red.png';
import markerBlueIcon from './../../../assets/icons/spotlight-poi-dotless-blue.png';

const gradient = {
    start: {r: 255, g: 0, b: 100},
    end: {r: 20, g: 123, b: 255}
}

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 50.12,
    lng: 19.01
};

const iconRed = {
    labelOrigin: {x: 13, y: 15},
    url: markerRedIcon
}

const iconBlue = {
    labelOrigin: {x: 13, y: 15},
    url: markerBlueIcon
}

const MODE = {
    FAST: 0,
    ACCURATE: 1
}

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: MODE.ACCURATE
        }

        this.toggleMode = this.toggleMode.bind(this);
    }

    toggleMode() {
        this.setState({
            mode: (this.state.mode === MODE.FAST) ? MODE.ACCURATE : MODE.FAST
        })
    }

    render() {
        //Create array that maps given orderID to position in arrangement array
        const labelMap = this.props.ordersArrangement.reduce((acc, val, index) => {
            acc[val] = index;
            return acc
        }, {});

        //Crate array that maps given orderID to position orders array
        const idUnderOrdersArrayIndex = this.props.orders.reduce((acc, val, index) => {
            acc[val.id] = index;
            return acc
        }, {});

        let addressesPairs = [];

        for (let i = 0; i < this.props.ordersArrangement.length - 1; i++) {
            let a = this.props.orders[idUnderOrdersArrayIndex[this.props.ordersArrangement[i]]];
            let b = this.props.orders[idUnderOrdersArrayIndex[this.props.ordersArrangement[i + 1]]];

            let pair = {
                fast: [a.geo_cord, b.geo_cord]
            };

            if (this.state.mode === MODE.ACCURATE) {
                pair.accurate = a.address_id + ',' + b.address_id;
            }

            addressesPairs.push(pair);
        }

        const amountOfParts = addressesPairs.length - 1;
        const routes = addressesPairs.map((addressPair, index) => {

            let p = index / amountOfParts;
            let color = {
                r: gradient.start.r * (1 - p) + gradient.end.r * p,
                g: gradient.start.g * (1 - p) + gradient.end.g * p,
                b: gradient.start.b * (1 - p) + gradient.end.b * p,
            }
            color = `rgb(${color.r}, ${color.g}, ${color.b})`;

            if (this.state.mode === MODE.ACCURATE && this.props.routeBits[addressPair.accurate] !== undefined) {
                return (
                    <Polyline
                        key={index}
                        path={polylineTools.decode(this.props.routeBits[addressPair.accurate].polyline).map(n => {
                            return {lat: n[0], lng: n[1]}
                        })}
                        options={{strokeColor: color}}
                    />
                );
            }

            addressPair = addressPair.fast.map(cords => cords.split(',').map(x => parseFloat(x)));
            return (
                <Polyline
                    key={index}
                    path={[
                        {lat: addressPair[0][0], lng: addressPair[0][1]},
                        {lat: addressPair[1][0], lng: addressPair[1][1]}
                    ]}
                    options={{color: color}}
                />
            )


        });

        const markers = this.props.orders.map((order) => {
            let [lat, lng] = order.geo_cord.split(',').map(x => parseFloat(x));
            let active = order.id === this.props.activeOrder.id;
            let labelNumber = labelMap[order.id] + 1;

            return (
                <Marker
                    position={{lat: lat, lng: lng}}
                    label={{color: '#fff', text: labelNumber.toString()}}
                    key={order.id}
                    icon={active ? iconBlue : iconRed}
                    zIndex={active ? 1000 : labelNumber}
                    onClick={() => {
                        this.props.setActiveOrder(order.id, CHANGE_SOURCE.MAP)
                    }}
                />
            );
        });

        return (
            <LoadScript
                googleMapsApiKey={API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    id={"842d0fc738c6d0d6"}
                    center={center}
                    zoom={13}
                    options={{styles: mapStyle}}
                >
                    {routes}

                    {markers}
                </GoogleMap>
                <div>
                    <Button
                        className={Style.toggleButton}
                        variant="light"
                        onClick={this.toggleMode}
                    >Tryb {this.state.mode === MODE.FAST ? 'Szybki' : 'Dokładny'}</Button>
                </div>
            </LoadScript>
        )
    }
}

export default Map;