import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import styled from 'styled-components';
import {LatLng} from 'leaflet';

const MapWrapper = styled.div`
  .leaflet-container {
    height: 400px;
  }
`;

function CustomMap({coordinates, setAction}) {
  function LocationMarker() {
    const dispatch = useDispatch();
    const [position, setPosition] = useState(() => {
      if (coordinates) {
        return new LatLng(coordinates.lat, coordinates.lng);
      }

      return null;
    });

    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setAction(e.latlng.lat, e.latlng.lng);
        console.log(e.latlng);
      }
      // locationfound(e) {
      //   setPosition(e.latlng);
      //   console.log(e.latlng);
      //   // map.flyTo(e.latlng, map.getZoom());
      // }
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Вы здесь :)</Popup>
      </Marker>
    );
  }

  return (
    <MapWrapper style={{width: '100%', height: '400px'}}>
      <MapContainer center={{lat: 49.8419, lng: 24.0315}} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </MapWrapper>
  );
}

export default CustomMap;
