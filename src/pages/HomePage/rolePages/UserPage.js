import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {useHistory, Switch, Route} from 'react-router-dom';
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
import {hideModal, del, getCoordinates} from '../../../actions/userActions';
import RequestModal from './RequestModal';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isModalShown = useSelector(state => state.user.isModal);
  const coordList = useSelector(state => state.user.coordList);

  useEffect(() => {
    let lat = Math.floor(Math.random() * 65) + 54;
    let lng = Math.floor(Math.random() * 53) + 34;
    let token = Cookies.get('token');
    dispatch(getCoordinates(lat, lng, token));
  }, []);

  useEffect(() => {
    console.log(coordList);
  }, [coordList]);

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
            onClick={() => history.push('/home/list')}
            style={{height: '30px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Show requests
          </Button>
          <Button
            style={{height: '30px'}}
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

          <div>{coordList && coordList.length > 0 && <Map data={coordList} />}</div>
        </LoginFormWrapper>

        <Switch>
          <Route path="/home/list">
            <div>список текущих полетов</div>
          </Route>
        </Switch>
      </LoginWrapper>
      );
    </>
  );
}

export default UserPage;
