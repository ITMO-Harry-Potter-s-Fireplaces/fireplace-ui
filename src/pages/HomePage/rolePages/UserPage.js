import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Map from './Map';
import {
  LoginWrapper,
  LoginFormWrapper,
  BackImage,
  Logo,
  CloudWrapper,
  Text
} from './UserPage.styles';
const position = [51.505, -0.09];

function UserPage() {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 49.8419,
    lng: 24.0315
  });
  const {lat, lng} = markerPosition;

  function moveMarker() {
    setMarkerPosition({
      lat: lat + 0.0001,
      lng: lng + 0.0001
    });
  }

  return (
    <>
      <LoginWrapper>
        <CloudWrapper>
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="40s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="60s" />
        </CloudWrapper>
        <LoginFormWrapper>
          <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
          <Text>Choose your fireplace</Text>
          <div>
            <Map
              data={[
                {lat: 24, lng: 12},
                {lat: 21.52, lng: 51.425},
                {lat: 23.52, lng: 21.425},
                {lat: 24.52, lng: 31.425},
                {lat: 52.42, lng: 51.425}
              ]}
              markerPosition={markerPosition}
            />
            <div>
              Current markerPosition: lat: {lat}, lng: {lng}
            </div>
            <button onClick={moveMarker}>Move marker</button>
          </div>
        </LoginFormWrapper>
      </LoginWrapper>
      );
    </>
  );
}

export default UserPage;
