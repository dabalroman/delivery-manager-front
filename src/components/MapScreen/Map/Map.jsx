import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker, Polyline} from '@react-google-maps/api';
import polylineTools from '@mapbox/polyline';

import {API_KEY} from "./api_key";
import {mapStyle} from "./MapStyle";
import {CHANGE_SOURCE} from "../MapScreen";

import markerRedIcon from './../../../assets/icons/spotlight-poi-dotless-red.png';
import markerBlueIcon from './../../../assets/icons/spotlight-poi-dotless-blue.png';

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
            mode: MODE.FAST
        }
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

            if (this.state.mode === MODE.FAST) {
                addressesPairs.push([a.geo_cord, b.geo_cord]);
            } else {
                addressesPairs.push(a.address_id + ',' + b.address_id);
            }
        }

        const routes = addressesPairs.map((addressPair, index) => {

            if (this.state.mode === MODE.FAST) {
                addressPair = addressPair.map(cords => cords.split(',').map(x => parseFloat(x)));
                return (
                    <Polyline
                        key={index}
                        path={[{lat: addressPair[0][0], lng: addressPair[0][1]}, {lat: addressPair[1][0], lng: addressPair[1][1]}]}
                    />
                )
            }

            return (
                <Polyline
                    key={index}
                    path={polylineTools.decode(this.props.routeBits[addressPair].polyline).map(n => {return {lat: n[0], lng: n[1]}})}
                />
            );


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

        // const

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

                    {/*<Polyline*/}
                    {/*    path={polylineTools.decode('w`ypHewxrBHqGgFvA').map(n => {return {lat: n[0], lng: n[1]}})}*/}
                    {/*/>*/}
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default Map;