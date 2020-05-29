import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {LOGIN} from '../../../constants/routes';
import Map from './Map';
import {
  LoginWrapper,
  LoginFormWrapper,
  BackImage,
  Logo,
  CloudWrapper,
  Text,
  Header
} from './UserPage.styles';
import {hideModal, del} from '../../../actions/userActions';
import RequestModal from './RequestModal';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isModalShown = useSelector(state => state.user.isModal);

  const signOut = () => {
    console.log('press');
    Cookies.remove('token');
    dispatch(del());
    history.push(LOGIN);
  };

  return (
    <>
      <LoginWrapper>
        <CloudWrapper>
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="40s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="60s" />
        </CloudWrapper>
        <Header>
          <Button
            style={{height: '20px'}}
            onClick={() => signOut()}
            variant="contained"
            color="primary">
            Logout
          </Button>
        </Header>
        <LoginFormWrapper>
          <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
          <Text>Choose your fireplace</Text>
          <RequestModal isOpen={isModalShown} handleClose={() => dispatch(hideModal())} />
          <div>
            <Map
              data={[
                {lat: 24, lng: 12},
                {lat: 21.52, lng: 51.425},
                {lat: 23.52, lng: 21.425},
                {lat: 24.52, lng: 31.425},
                {lat: 52.42, lng: 51.425}
              ]}
            />
          </div>
        </LoginFormWrapper>
      </LoginWrapper>
      );
    </>
  );
}

export default UserPage;
