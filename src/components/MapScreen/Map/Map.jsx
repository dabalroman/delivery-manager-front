import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {apiKey} from "./api_key";
import {mapStyle} from "./MapStyle";

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

class Map extends Component {
    render() {
        const markers = this.props.orders.map((order, index) => {
            let [lat, lng] = order.geo_cord.split(',').map(x => parseFloat(x));
            let active = order.id === this.props.activeOrderId;

            return (
                <Marker
                    position={{lat: lat, lng: lng}}
                    label={{color: '#fff', text: order.id.toString()}}
                    key={order.id}
                    icon={active ? iconBlue : iconRed}
                    zIndex={active ? 1000 : index}
                    onClick={() => {this.props.setActiveOrder(order.id)}}
                />
            );
        });

        return (
            <LoadScript
                googleMapsApiKey={apiKey}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    id={"842d0fc738c6d0d6"}
                    center={center}
                    zoom={13}
                    options={{styles: mapStyle}}
                >
                    {markers}
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default Map;