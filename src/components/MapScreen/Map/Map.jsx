import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {apiKey} from "./api_key";
import {mapStyle} from "./MapStyle";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 50.12,
    lng: 19.01
};

class Map extends Component {
    render() {
        const markers = this.props.orderAddressMap.map((order) => {
            let [lat, lng] = order.coordinates.split(',').map(x => parseFloat(x));
            return (
                <Marker position={{lat: lat, lng: lng}} label={order.order_id.toString()} key={order.order_id}/>
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