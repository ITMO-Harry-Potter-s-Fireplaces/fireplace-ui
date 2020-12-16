import React, {useEffect, useRef} from 'react';
import L from 'leaflet';
import {useDispatch} from 'react-redux';
import {showModal} from '../../../actions/userActions';

const style = {
  width: '100%',
  height: '400px'
};

function Map({markerPosition, data}) {
  // create map
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    const coor = [];

    data.forEach(element => {
      coor.push(L.latLng(parseFloat(element.lat), parseFloat(element.lng)));
    });
    for (let m of coor) {
      L.marker(m)
        .addTo(mapRef.current)
        .on('click', () => {
          dispatch(showModal());
        });
    }
    mapRef.current.fitBounds(coor);
  }, []);

  // add marker
  const markerRef = useRef(null);
  useEffect(() => {
    if (markerRef.current) {
      data.forEach(element => {
        markerRef.current.setLatLng(element.lat, element.lng);
      });
    }
    // if (markerRef.current) {
    //   markerRef.current.setLatLng(markerPosition);
    // } else {
    //   markerRef.current = L.marker(markerPosition).addTo(mapRef.current);
    // }
  }, [data]);

  return <div id="map" style={style} />;
}

export default Map;
