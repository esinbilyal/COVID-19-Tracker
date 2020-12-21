import React from 'react'
import { Map as LeafletMap, MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from './util';

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <MapContainer
                center={center}
                zoom={zoom}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* {Loop through countries and draw circles on the map} */}
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
